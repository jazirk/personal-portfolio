import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pages are pre-rendered and served statically; the home page regenerates
  // hourly (ISR) so new Hashnode posts appear without a redeploy.
  images: { unoptimized: true },
}

export default nextConfig
