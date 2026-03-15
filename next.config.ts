import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  experimental: {
    authInterrupts: true,
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
