// import "@/index.css";
// import "aos/dist/aos.css";
// import { useEffect } from "react";
// import { AppProvider } from "@/Components/appContext";
// import { CartProvider } from "@/Components/cartContext";
// import Template from "@/Components/Template/Template";
// import Head from "next/head";
// import '../../i18n';
// import { appWithTranslation } from 'next-i18next';

//  function App({ Component, pageProps }) {
//   useEffect(() => {
//     // Charger le script Google Analytics
//     const script = document.createElement("script");
//     script.src = `https://www.googletagmanager.com/gtag/js?id=G-JVBQQF1007`;
//     script.async = true;
//     document.head.appendChild(script);

//     // Initialiser Google Analytics
//     window.dataLayer = window.dataLayer || [];
//     function gtag() {
//       window.dataLayer.push(arguments);
//     }
//     gtag("js", new Date());
//     gtag("config", "G-JVBQQF1007");
//   }, []);

//   return (
//     <>
//       <Head>
//         {/* Viewport Meta Tag for Mobile Optimization */}
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <AppProvider>
//         <CartProvider>
//           <Template>
//             <Component {...pageProps} />
//           </Template>
//         </CartProvider>
//       </AppProvider>
//     </>
//   );
// }

// export default appWithTranslation(App);

import "@/index.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { AppProvider } from "@/Components/appContext";
import { CartProvider } from "@/Components/cartContext";
import Template from "@/Components/Template/Template";
import Head from "next/head";
import "../../i18n";
import { appWithTranslation } from "next-i18next";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Link from "next/link";
import { useTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  useEffect(() => {
    // Chargement direct de GTM + GA
    loadGtmAndGa();
    // Chargement direct Umami
    loadUmami();



    // Chargement conditionnel Albacross selon consentement
    const consent = getCookieConsentValue("pixecurityCookieConsent");
    if (consent === "true") {
      loadAlbacross();
    }
  }, []);

  const loadUmami = () => {
  if (!window.umamiLoaded) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "http://localhost:3000/script.js"; // Remplace par l'URL publique si déployé
    script.setAttribute("data-website-id", "65d60149-6fad-4181-8a40-ce680cbb0d2e");
    document.head.appendChild(script);
    window.umamiLoaded = true;
  }
};


  const loadGtmAndGa = () => {
    // Google Tag Manager
    if (!window.gtmLoaded) {
      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-W4CMDFC4";
      document.head.appendChild(gtmScript);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      window.gtmLoaded = true;
    }

    // Google Analytics (via gtag.js)
    if (!window.gaLoaded) {
      const gaScript = document.createElement("script");
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-JVBQQF1007";
      gaScript.async = true;
      document.head.appendChild(gaScript);

      gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-JVBQQF1007", { anonymize_ip: true });

        window.gaLoaded = true;
      };
    }
  };

  const loadAlbacross = () => {
    if (!window.albLoaded) {
      window._nQc = "89724931"; // Ton ID Albacross ici
      const albScript = document.createElement("script");
      albScript.async = true;
      albScript.src = "https://serve.albacross.com/track.js";
      document.body.appendChild(albScript);

      window.albLoaded = true;
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider>
        <CartProvider>
          <Template>
            <Component {...pageProps} />
            <CookieConsent
              location="bottom" // on override plus bas avec style, donc location n'a plus d'effet
              buttonText="J'accepte"
              declineButtonText="Refuser"
              enableDeclineButton
              cookieName="pixecurityCookieConsent"
              onAccept={loadAlbacross}
              style={{
                position: "fixed",
                top: "50%", // milieu verticalement (à 50% de la hauteur)
                left: "50%", // milieu horizontalement
                transform: "translate(-50%, 50%)", // centre exact (légère correction sur Y pour être visible)
                background: "#2B373B",
                fontSize: "16px",
                padding: "15px 25px",
                borderRadius: "10px",
                maxWidth: "90%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                zIndex: 9999,
              }}
              buttonWrapperClasses="cookie-buttons"
              buttonStyle={{
                background: "#009fe3",
                color: "#fff",
                fontSize: "15px",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "8px 16px",
              }}
              declineButtonStyle={{
                background: "#ccc",
                color: "#000",
                fontSize: "13px",
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "8px 16px",
              }}
              expires={150}
            >
              Ce site utilise des cookies pour le suivi statistique et
              marketing.{" "}
              <Link
                href="/rgpd"
                style={{ color: "#009fe3", textDecoration: "underline" }}
              >
                En savoir plus
              </Link>
            </CookieConsent>
          </Template>
        </CartProvider>
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
