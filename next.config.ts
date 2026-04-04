import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    authInterrupts: true,
  },
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  outputFileTracingIncludes: {
    '/api/reports/generate-pdf': ['./node_modules/@sparticuz/chromium/bin/**'],
  },
  images: {
    remotePatterns: [
      new URL(
        'https://images.steamusercontent.com/ugc/1262645644984404336/B1CB55E88C3B48B18DFA53249931E7F6560634D8/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
      ),
      new URL(
        'https://i.pinimg.com/736x/79/53/62/795362193c087ddd79898beda9e6fc07.jpg'
      ),
      new URL('https://images.pexels.com/photos/**'),
    ],
  },
}

export default nextConfig
