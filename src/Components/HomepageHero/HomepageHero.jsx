import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "next-i18next";

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

  const { t } = useTranslation();

  return (
    <div className={styles["homepageHero-container"]}>
      <div className={styles.section1}>
        <div className={styles["hero-left"]}>
          <h4 >
            Smarter. <br /> Safer.
          </h4>
        </div>

        <div className={styles["hero-right"]}>
          <div
            className={styles.titles}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h1> {t("homepageHero.heroTitle")}</h1>
            <h2>{t("homepageHero.heroDescription")}</h2>
          </div>
          <div className={styles.homepageHeroCta}>
            <Link href="/boutique">
              <button className={styles.ctaShop}>{t("homepageHero.visitShop")}</button>
            </Link>
            <Link href="/devis">
              <button className={styles.ctaContact}>{t("homepageHero.quotation")}</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles["section2-intro"]}>
          <div className={styles["section2-img"]}></div>

          <div className={styles["section2-text"]}>
            <p className={styles.text1} > {t("homepageHero.section2Text1")}</p>
            <p className={styles.text2}> {t("homepageHero.section2Text2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
