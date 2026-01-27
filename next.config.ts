import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: 'https', 
        hostname: 'damo.today',
        pathname: '/s3/images/**',
      }
    ]
  }
};

export default nextConfig;
