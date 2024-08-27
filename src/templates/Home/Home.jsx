import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";

import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import Hero from "@/Components/HomepageHero/HomepageHero";
import HomepageSkills from "@/Components/HomepageSkills/HomepageSkills";
import HomepagePartners from "@/Components/HomepagePartners/HomepagePartners";
import HomepageCountUp from "@/Components/HomepageCountUp/HomepageCountUp";
import HomepageCustomersSlider from "@/Components/HomepageCustomersSlider/HomepageCustomersSlider";
import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>
          Pixecurity - Fournisseur de solutions de sûreté intelligentes -
          Vidéosurveillance, analyse d'image, contrôle d'accès, réseaux/stockage
          des données, hypervision
        </title>

        <meta
          name="description"
          content="Découvrez Pixecurity, leader dans la sûreté 3.0. Experts en BTP, réseaux, et technologies du bâtiment."
        />
        <meta
          name="keywords"
          content="sécurité, sûreté, protection, videoprotection, surveillance, videosurveillance, france, paris, IDF, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, caméras, IA, AI, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
      </Head>

      <div className={styles["homepage-container"]}>
        <RegisterPopup />
        <Hero />
        <div className={styles["section2-offer"]}>
          <h3>{t("home.offerTitle")}</h3>
          <p>{t("home.offerDescription")}</p>
        </div>

        <HomepageSkills />

        <div className={styles["section4-aboutUs"]}>
          <div className={styles["section4-text"]}>
            <h3>{t("home.aboutUsTitle")}</h3>
            <p>{t("home.aboutUsDescription")}</p>
            <div className={styles.ctaButtons}>
              <Link href="/a-propos">
                <button className={styles.ctaTeam}>{t("home.ourTeam")}</button>
              </Link>
              <Link href="/notre-expertise">
                <button className={styles.ctaExpertise}>
                  {t("home.ourExpertise")}
                </button>
              </Link>
            </div>
          </div>
          <div className={styles["section4-img"]}></div>
        </div>

        <HomepagePartners />
        <HomepageCountUp />

        <HomepageCustomersSlider />

        <div className={styles.learnMore}>
          <h5> Ready to learn more ? </h5>
          <Link href="/contact">
            <button> {t('home.contactUs')}</button>
          </Link>
        </div>

        {/* <div className={styles.shopBanner}>
          <h3> Découvrez notre boutique en ligne </h3>
          <img
            src="assets/shop.png"
            alt="Bannière pour découvrir notre boutique en ligne"
            loading="lazy"
          />
        </div> */}
      </div>
    </>
  );
}
