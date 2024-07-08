import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
       {/* Title of the tab */}
       <title>Pixecurity - Fournisseur de solutions de sûreté intelligentes</title>
        
        {/* Favicon for the tab */}
        <link rel="icon" href="http://files.pixecurity.com/wp-content/uploads/sites/2/2024/07/logo-onglet.png" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      <link href="https://fonts.cdnfonts.com/css/barlow" rel="stylesheet" />
      <link
        href="https://fonts.cdnfonts.com/css/barlow-condensed"
        rel="stylesheet"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
