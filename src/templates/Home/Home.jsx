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
import HomepageHero2 from "@/Components/HomepageHero2/HomepageHero2";

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
          Caméras de vidéosurveillance, analyse d'image, contrôle d'accès,
          réseaux, stockage des données, hypervision
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
        {/* <Hero /> */}
        <HomepageHero2 />
        <div className={styles["section2-offer"]}>
          <h3>{t("home.offerTitle")}</h3>
          <p>{t("home.offerDescription1")}</p>
          <p>{t("home.offerDescription2")}</p>
          {/* "offerTitle": "Une offre pensée autrement",
     "offerDescription": "La protection de vos données personnelles certifiée Pixecurity c'est : la fourniture d'outils électroniques, une plateforme de gestion de projets réalisée en propre pour faciliter l'interaction avec nos experts, des développements spécifiques et sur mesure, la mise en place de solutions cyber. Des certifications de conformités délivrées par nos consultants sur du compliance : Pixecurity couvre toute la haute chaîne de valeur de la sûreté. Pixecurity est le fournisseur de solutions de sûreté 3.0.",
     */}
        </div>

        <HomepageSkills />

        <div className={styles["section4-aboutUs"]}>
          <div className={styles["section4-text"]}>
            <h3>{t("home.aboutUsTitle")}</h3>
            <p>{t("home.aboutUsDescription")}</p>
            <div className={styles.ctaButtons}>
              <Link href="/qui-sommes-nous">
                <button className={styles.ctaTeam}>{t("home.ourTeam")}</button>
              </Link>
              <Link href="/notre-expertise-en-solutions-de-surete">
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
          <Link href="//contact">
            <button> {t("home.contactUs")}</button>
          </Link>
        </div>
        <div className={styles.linkedinFeedCarousel}>
          <iframe
            width="100%"
            height="440"
            src="https://rss.app/embed/v1/carousel/HvV50piN6NgpW3kC"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </>
  );
}
