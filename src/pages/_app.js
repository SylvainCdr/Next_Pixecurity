import "@/index.css";
import "aos/dist/aos.css";

import { useEffect } from "react";
import { AppProvider } from "@/Components/appContext";
import { CartProvider } from "@/Components/cartContext";
import Template from "@/Components/Template/Template";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Charger le script Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-JVBQQF1007`;
    script.async = true;
    document.head.appendChild(script);

    // Initialiser Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-JVBQQF1007');
  }, []);

  return (
    <>
      <Head>
        {/* Viewport Meta Tag for Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider>
        <CartProvider>
          <Template>
            <Component {...pageProps} />
          </Template>
        </CartProvider>
      </AppProvider>
    </>
  );
}
