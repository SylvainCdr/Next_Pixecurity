import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function HomepageHero2() {
  const { t } = useTranslation();

  return (
    <div className={styles.homepageHeroContainer}>

<div className={styles.imageWrapper}>
<Image
  src="/assets/homepage/homepage-hero.webp"
  alt="Hero Image"
  layout="fill"
  objectFit="cover"
  priority // Chargement instantané
/>
</div>

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
          <Link href="/devis-securite-surveillance">
            <button className={styles.ctaQuotation}>
              {t("homepageHero.quotation")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
