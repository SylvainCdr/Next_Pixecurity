import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import styles from "./style.module.scss";

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
  );
}
