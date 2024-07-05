import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";

export default function HomepageHero() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className={styles["homepageHero-container"]}>
      <div className={styles.section1}>
        <div className={styles["hero-left"]}>
          <h4
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            Smarter. <br /> Safer.
          </h4>
        </div>

        <div className={styles["hero-right"]}>
          <div className={styles.titles}>
          <h1 data-aos="fade-up" data-aos-duration="3000">
            Fournisseur de solutions de sûreté intelligentes
          </h1>
          <h3>
            Vidéosurveillance, analyse d'image, contrôle d'accès,
            réseaux/stockage des données, hypervision...
          </h3>
          </div>
          <div className={styles.homepageHeroCta}>
            <Link href="/boutique" >
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
            {/* <div data-aos="zoom-in" className={styles.icons}>
            <img src="../assets/icons/ico3.png" alt="" />
            <img src="../assets/icons/ico2.png" alt="" />
            <img src="../assets/icons/ico1.png" alt="" />
            <img src="../assets/icons/ico4.png" alt="" />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
