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

        <link
          rel="preload"
          href="/assets/homepage/homepage-hero.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/homepage/cube3(1).webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          as="image"
        />
        <link rel="preload" href="/assets/homepage/wave3.webp" as="image" />
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
          <div className={styles.learnMoreMap}>
            <div className={styles.mapLeft}>
              <h3>
                Pixecurity, présent partout en France pour vous accompagner
              </h3>
              <p>
                Pixecurity, c’est une expertise locale avec une présence
                nationale. Nos bureaux sont situés à Paris, cœur stratégique de
                notre activité, tandis que nos équipes commerciales sont
                également implantées à Bordeaux et Lyon pour être au plus proche
                de nos clients.
              </p>

              <p>
                Que vous soyez en Île-de-France, dans le Sud-Est ou dans le
                Sud-Ouest, nos experts sont là pour vous conseiller et vous
                accompagner dans vos projets de sécurité et de sûreté.
              </p>

              <ul>
                <li>
                  <i class="fa-solid fa-location-dot"></i>{" "}
                  <strong>Paris</strong> – Siège - Etude, Conseil et
                  accompagnement
                </li>

                <li>
                  <i class="fa-solid fa-location-dot"></i>{" "}
                  <strong>Lille</strong> – Antenne - Conseil et accompagnement
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i>{" "}
                  <strong>Bordeaux</strong> – Antenne - Conseil et
                  accompagnement
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i> <strong>Lyon</strong>{" "}
                  – Antenne- Conseil et accompagnement
                </li>
              </ul>
              {/* <p>
              Besoin d’un accompagnement personnalisé ? Contactez nos experts
              dès aujourd’hui !
            </p> */}
            </div>

            <div className={styles.mapRight}>
              <img src="/assets/homepage/map2.png" alt="carte activité" />
            </div>
          </div>

          <div className={styles.learnMoreCTA}>
            <h4> Ready to learn more ? </h4>
            <Link href="/contact">
              <button> {t("home.contactUs")}</button>
            </Link>
          </div>
        </div>
        <div className={styles.linkedinFeedCarousel}>
          <iframe
            width="100%"
            height="440"
            src="https://rss.app/embed/v1/carousel/HvV50piN6NgpW3kC"
            frameBorder="0"
            title="pixecurity linkedin feed"
          ></iframe>
        </div>
      </div>
    </>
  );
}
