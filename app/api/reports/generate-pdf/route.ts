import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import timezone from 'dayjs/plugin/timezone'
import { NextRequest, NextResponse } from 'next/server'

dayjs.extend(utc)
dayjs.extend(timezone)

import { ReportPDFTemplate } from '@/templates/report-pdf-template'

type FluigStatus = 'Approved' | 'Pending' | 'Not_Approved'

interface ReportItem {
  id: string
  date: Date
  code: string
  product: string
  quantity: string
  nFluig: number
  costTotal: string
  cost: string
  status: FluigStatus
}

interface GeneratePDFRequest {
  data: ReportItem[]
  filters: {
    status: FluigStatus | 'All'
    month: number | 'All'
  }
}

let browserPromise: any = null

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }

  return browserPromise
}

export async function POST(request: NextRequest) {
  const browser = await getBrowser()

  try {
    const body: GeneratePDFRequest = await request.json()
    const { data, filters } = body

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Dados inválidos para gerar o relatório' },
        { status: 400 }
      )
    }

    const page = await browser.newPage()

    const htmlContent = ReportPDFTemplate({
      data,
      filters,
      generatedAt: new Date(),
    })

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    })

    await page.close()

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="relatorio-fluig-${Date.now()}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    return NextResponse.json(
      { error: 'Erro interno ao gerar o relatório' },
      { status: 500 }
    )
  }
}
