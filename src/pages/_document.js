// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Meta Tags for SEO */}
        <meta
          name="description"
          content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité."
        />
        <meta
          name="keywords"
          content="sécurité, sûreté, protection, videoprotection, surveillance, videosurveillance, Pixecurity, france, paris, IDF, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, caméras, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til, genetec, hikvision, dahua, axis"
        />
        <meta name="author" content="Pixecurity" />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Pixecurity - Solutions Intelligentes pour la Sécurité et la Vidéosurveillance / Intelligent Solutions for Security and Video Surveillance / حلول ذكية للأمان والمراقبة بالفيديو"
        />
        <meta
          property="og:description"
          content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité."
        />
        <meta property="og:url" content="https://www.pixecurity.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://uploads.pixecurity.com/files/fav-pix-shop_1.png"
        />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Pixecurity" />
        <meta
          name="google-site-verification"
          content="QvkZATbvD-BmH2iBLbgj5TkwY3U186eXjsvJ8HEsYmk"
        />
        <meta
          name="google-site-verification"
          content="N873MTUl_TjLc2KnzhdPY9hti3IdxlOYyukQq3DkWYo"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://uploads.pixecurity.com/files/fav-pix-shop_1.png"
        />

        Google Fonts
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* Optionnel : tu peux laisser ce bloc si tu veux que GTM fonctionne aussi si JS est désactivé */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4CMDFC4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
