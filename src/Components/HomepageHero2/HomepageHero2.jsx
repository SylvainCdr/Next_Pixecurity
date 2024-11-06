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
      <div className={styles.titles}>
        <h1> {t("homepageHero.heroTitle")}</h1>
        <h2>{t("homepageHero.heroDescription")}</h2>
      <div className={styles.homepageHeroCta}>
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


      {/* // <div className={styles.section2}>
      //   <div className={styles["section2-intro"]}>
      //     <div className={styles["section2-img"]}></div>

      //     <div className={styles["section2-text"]}>
      //       <p className={styles.text1} > {t("homepageHero.section2Text1")}</p>
      //       <p className={styles.text2}> {t("homepageHero.section2Text2")}</p>
      //     </div>
      //   </div>
      // </div> */}
    </div>
  );
}
