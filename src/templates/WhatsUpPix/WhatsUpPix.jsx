import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import styles from "./style.module.scss";
import Head from "next/head";

export default function WhatsUpPix() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ne pas injecter deux fois
    const existingScript = document.querySelector(
      'script[src="https://widget.rss.app/v1/magazine.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://widget.rss.app/v1/magazine.js";
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      // Si déjà chargé, on peut immédiatement afficher
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>What's Up Pixecurity? | Actus, innovations & coulisses</title>
        <meta
          name="description"
          content="Suivez les dernières actualités de Pixecurity : innovations, projets sur le terrain,  nouvelles recrues, partenariats locaux et aventures technologiques."
        />
        <meta
          name="keywords"
          content="Pixecurity, actualités sécurité, interphonie, vidéosurveillance, contrôle d'accès, électricité, innovation, équipe, recrutement, projets sécurité, technologies sûreté, Paris, France"
        />
        <meta name="author" content="Pixecurity" />
      </Head>

      <div className={styles.whatsUpcontainer}>
        <h1>What's Up Pixecurity?</h1>

        {!isLoaded ? (
          <div className={styles.loaderWrapper}>
            <PropagateLoader color="#760498" />
          </div>
        ) : (
          <rssapp-magazine id="HvV50piN6NgpW3kC"></rssapp-magazine>
        )}
      </div>
    </>
  );
}
