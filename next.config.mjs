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
      { protocol: "https", hostname: "*.flir.*" }, // Flir
      { protocol: "https", hostname: "*.herokuapp.com8" }, // Pour Heroku (évite d'ajouter un sous-domaine spécifique)
      { protocol: "https", hostname: "i.ytimg.com" }, // Pour Heroku (évite d'ajouter un sous-domaine spécifique)
      { protocol: "https", hostname: "static.vivotek.vn" }, // Pour Heroku (évite d'ajouter un sous-domaine spécifique)
      {
        protocol: "https",
        hostname:
          "resources-boschescurity-cdn-hre9eue8h0fefmcd.a02.azurefd.net",
      },
      {
        protocol: "https",
        hostname: "agile-brushlands-56076-16e3e6016b28.herokuapp.com",
      }, // Heroku
      { protocol: "https", hostname: "localhost" }, // Pour le développement local
    ],
  },
};

export default nextConfig;
