import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "next-i18next";

export default function HomepageHero2() {
  const { t } = useTranslation();

  return (
    <div className={styles.homepageHeroContainer}>
      <h4>
        Smarter. <br /> Safer.
      </h4>
      <div className={styles.titles} data-aos="zoom-in-down">
        <h1> {t("homepageHero.heroTitle")}</h1>
        <h2>{t("homepageHero.heroDescription")}</h2>
      <div className={styles.homepageHeroCta} data-aos="fade-down">
        <Link href="/boutique">
          <button className={styles.ctaShop}>
            {t("homepageHero.visitShop")}
          </button>
        </Link>
        <Link href="/devis">
          <button className={styles.ctaQuotation}>
            {t("homepageHero.quotation")}
          </button>
        </Link>
      </div>
      </div>


    
    </div>
  );
}
