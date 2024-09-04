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
  }, []);

  const { t } = useTranslation();

  const videoRef = useRef(null);

  return (
    <div className={styles["homepageHero-container"]}>
      <div className={styles.video}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          onLoadedData={() => videoRef.current.play()}
        >
          <source src="/assets/lockVideo2.mp4" type="video/mp4" />
        </video>

        <h4 data-aos="fade-right">
          Smarter. <br /> Safer.
        </h4>

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
            <button className={styles.ctaShop}>
              {t("homepageHero.visitShop")}
            </button>
          </Link>
          <Link href="/contact">
            <button className={styles.ctaContact}>
              {t("homepageHero.contact")}
            </button>
          </Link>
        </div>

        <p className={styles.text1}> {t("homepageHero.section2Text1")}</p>
        <p className={styles.text2}> {t("homepageHero.section2Text2")}</p>
      </div>
    </div>
  );
}
