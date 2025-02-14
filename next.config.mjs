/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uploads.pixecurity.com", // Add your authorized host here
      },
      // localhost
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      // i-pro.com
      {
        protocol: "https",
        hostname: "i-pro.com",
      },
    ],
  },
};

export default nextConfig;
