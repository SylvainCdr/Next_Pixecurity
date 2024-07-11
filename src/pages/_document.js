import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags for SEO */}
        <meta name="description" content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité." />
        <meta name="keywords" content="sécurité, solutions de sûreté, protection, surveillance, Pixecurity, france, paris, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til" />
        <meta name="author" content="Pixecurity" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Pixecurity - Fournisseur de solutions de sûreté intelligentes" />
        <meta property="og:description" content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité." />
        <meta property="og:url" content="https://www.pixecurity.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="http://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Pixecurity" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pixecurity - Fournisseur de solutions de sûreté intelligentes" />
        <meta name="twitter:description" content="Pixecurity offre des solutions de sûreté innovantes pour protéger vos biens et votre personnel. Découvrez nos solutions de sécurité." />
        <meta name="twitter:image" content="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png" />
        <meta name="twitter:site" content="@pixecurity" />

        

        {/* Viewport Meta Tag for Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon for the tab */}
        <link rel="icon" href="https://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/fav-pix.png" />

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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
