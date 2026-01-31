import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "d3susamqetme5j.cloudfront.net",
        pathname: "/**", 
      }
    ]
  }
};

export default nextConfig;
