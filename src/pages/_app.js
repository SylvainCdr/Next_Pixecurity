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


function App({ Component, pageProps }) {
  useEffect(() => {
    loadGtmAndGa();
    loadUmami();

    // Charger Font Awesome CSS dynamiquement
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const consent = getCookieConsentValue("pixecurityCookieConsent");
    if (consent === "true") {
      loadAlbacross();
    }
  }, []);

  const umamiWebsiteId = "65d60149-6fad-4181-8a40-ce680cbb0d2e";
  const umamiScriptUrl = "https://umami-analytics-navy-nu.vercel.app/script.js";

  function loadUmami() {
    if (!window.umami) {
      const script = document.createElement("script");
      script.defer = true;
      script.setAttribute("data-website-id", umamiWebsiteId);
      script.src = umamiScriptUrl;
      document.head.appendChild(script);
    }
  }

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
          <main >
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
                  href="/politique-de-confidentialite"
                  style={{ color: "#009fe3", textDecoration: "underline" }}
                >
                  En savoir plus
                </Link>
              </CookieConsent>
            </Template>
          </main>
        </CartProvider>
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
