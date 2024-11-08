/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    domains: ["files.pixecurity.com"], // Ajoutez ici l'hôte autorisé
  },
};

export default nextConfig;
