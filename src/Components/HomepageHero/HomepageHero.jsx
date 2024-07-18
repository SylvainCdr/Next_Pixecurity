import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";

export default function HomepageHero() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });

    // On charge l'image en arrière-plan du hero-right après le chargement de la page
    const heroRightElement = document.querySelector(`.${styles["hero-right"]}`);
    const image = new Image();
    image.src = "/assets/homepage/hero1.webp";
    image.onload = () => {
      heroRightElement.style.backgroundImage = `url(${image.src})`;
    };
  }, []);

  return (
    <div className={styles["homepageHero-container"]}>
      <div className={styles.section1}>
        <div className={styles["hero-left"]}>
          <h4 data-aos="fade-right">
            Smarter. <br /> Safer.
          </h4>
        </div>

        <div className={styles["hero-right"]}>
          <div
            className={styles.titles}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h1>Fournisseur de solutions de sûreté intelligentes</h1>
            <h2>
              <strong>
                Vidéosurveillance, analyse d'image, contrôle d'accès,
                réseaux/stockage des données, hypervision...
              </strong>
            </h2>
          </div>
          <div className={styles.homepageHeroCta}>
            <Link href="/boutique">
              <button className={styles.ctaShop}>Visiter la boutique</button>
            </Link>
            <Link href="/contact">
              <button className={styles.ctaContact}>Contactez nous</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles["section2-intro"]}>
          <div className={styles["section2-img"]}></div>

          <div className={styles["section2-text"]}>
            <p>
              La <strong>sûreté</strong> ne dépend plus de la force brute, mais
              de <strong>l'intelligence</strong>. <br /> Chez{" "}
              <strong>Pixecurity</strong>, nous sommes les fournisseurs de
              systèmes de <strong>sûreté</strong> intelligents. <br />
              Notre <strong>mission</strong> : vous accompagner avec les{" "}
              <strong>meilleurs</strong> produits et des{" "}
              <strong>solutions</strong> sur-mesure, repensant la sécurité selon
              vos besoins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
