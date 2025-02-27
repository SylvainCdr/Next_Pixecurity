/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "uploads.pixecurity.com" }, // Pixecurity uploads
      { protocol: "https", hostname: "i-pro.com" }, // Gère i-pro.com et ses sous-domaines
      { protocol: "https", hostname: "*.vivotek.com" }, // Gère vivotek.com et blob.vivotek.com
      { protocol: "https", hostname: "*.zyxel.com" }, // Zyxel et ses sous-domaines
      { protocol: "https", hostname: "*.til-technologies.fr" }, // Til Technologies
      { protocol: "https", hostname: "*.herokuapp.com8" }, // Pour Heroku (évite d'ajouter un sous-domaine spécifique)
      { protocol: "https", hostname: "i.ytimg.com" }, // Pour Heroku (évite d'ajouter un sous-domaine spécifique)
    ],
  },
};

export default nextConfig;
