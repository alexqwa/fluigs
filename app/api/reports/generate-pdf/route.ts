import puppeteer from 'puppeteer'
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

async function getBrowser() {
  const isLocal = process.env.NODE_ENV === 'development'

  if (isLocal) {
    // Desenvolvimento local - usa puppeteer com chromium local
    const puppeteerFull = await import('puppeteer')
    return puppeteerFull.default.launch({
      headless: true,
    })
  }

  // Produção - usa @sparticuz/chromium otimizado para serverless
  chromium.setGraphicsMode = false

  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  })
}

export async function POST(request: NextRequest) {
  let browser = null

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

    browser = await getBrowser()
    const page = await browser.newPage()

    await page.setContent(htmlContent, {
      waitUntil: 'domcontentloaded',
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
