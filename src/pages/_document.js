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
          content="sécurité, sûreté, protection, videoprotection, surveillance, videosurveillance, Pixecurity, france, paris, IDF, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, caméras, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
        <meta name="author" content="Pixecurity" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Pixecurity - Fournisseur de solutions de sûreté intelligentes"
        />
        <meta
          property="og:description"
          content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité."
        />
        <meta property="og:url" content="https://www.pixecurity.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png"
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

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pixecurity - Fournisseur de solutions de sûreté intelligentes"
        />
        <meta
          name="twitter:description"
          content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité."
        />
        <meta
          name="twitter:image"
          content="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png"
        />
        <meta name="twitter:site" content="@pixecurity" />

        {/* Favicon for the tab */}
        <link
          rel="icon"
          href="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png"
        />

        {/* External Stylesheets */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link href="https://fonts.cdnfonts.com/css/barlow" rel="stylesheet" />
        <link
          href="https://fonts.cdnfonts.com/css/barlow-condensed"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W4CMDFC4');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4CMDFC4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
