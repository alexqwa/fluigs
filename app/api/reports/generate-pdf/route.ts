import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  const viewport = {
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1080,
    isLandscape: false,
    isMobile: false,
    width: 1920,
  }

  const browser = await puppeteer.launch({
    args: puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
    defaultViewport: viewport,
    executablePath: await chromium.executablePath(),
    headless: 'shell',
  })

  try {
    const body: GeneratePDFRequest = await request.json()
    const { data, filters } = body

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Dados inválidos para gerar o relatório' },
        { status: 400 }
      )
    }

    const htmlContent = ReportPDFTemplate({
      data,
      filters,
      generatedAt: new Date(),
    })

    const page = await browser.newPage()

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

    await browser.close()

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
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
