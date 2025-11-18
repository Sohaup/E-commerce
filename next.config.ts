import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[new URL("https://ecommerce.routemisr.com/**")]
  }  ,
  eslint:{
    ignoreDuringBuilds:true
  } ,
  typescript:{
    ignoreBuildErrors:true
  }
};

export default withFlowbiteReact(nextConfig);