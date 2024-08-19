import React, { useEffect } from "react";
import styles from "./style.module.scss";
import HomepageCustomersSlider from "../../Components/HomepageCustomersSlider/HomepageCustomersSlider";
import Hero from "@/Components/HomepageHero/HomepageHero";
import Link from "next/link";
import AOS from "aos";
import HomepageCountUp from "../../Components/HomepageCountUp/HomepageCountUp";
import HomepagePartners from "../../Components/HomepagePartners/HomepagePartners";
import HomepageSkills from "../../Components/HomepageSkills/HomepageSkills";
import Head from "next/head";
import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Pixecurity - Fournisseur de solutions de sûreté intelligentes - Vidéosurveillance, analyse d'image, contrôle d'accès, réseaux/stockage des données, hypervision</title> 

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
          <h3>Une offre pensée autrement</h3>
          <p>
            La protection de vos données personnelles certifiée Pixecurity c'est
            : la fourniture d'outils électroniques, une plateforme de gestion de
            projets réalisée en propre pour faciliter l'interaction avec nos
            experts, des développements spécifiques et sur mesure, la mise en
            place de solutions cyber. <br />
            Des certifications de conformités délivrées par nos consultants sur
            du compliance : Pixecurity couvre toute la haute chaîne de valeur de
            la sûreté. Pixecurity est le fournisseur de solutions de sûreté 3.0.
          </p>
        </div>

        <HomepageSkills />

        <div className={styles["section4-aboutUs"]}>
          <div className={styles["section4-text"]}>
            <h3>Qui sommes-nous ?</h3>
            <p>
              Des ingénieurs avant-gardistes. Des experts 3.0, natifs du
              numérique, spécialisés dans le BTP, les réseaux, les technologies
              du bâtiment, et toujours à l'affût des dernières avancées
              technologiques. Ce sont de véritables artisans de la sûreté,
              déterminés à dénicher les solutions les plus adaptées à vos
              exigences.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/a-propos">
                <button className={styles.ctaTeam}>Notre équipe</button>
              </Link>
              <Link href="/notre-expertise">
                <button className={styles.ctaExpertise}>Notre expertise</button>
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
            <button>Contactez-nous</button>
          </Link>
        </div>

        <div className={styles.shopBanner}>
          <h3> Découvrez notre boutique en ligne </h3>
          <img src="assets/shop.png" alt="Bannière pour découvrir notre boutique en ligne" loading="lazy" />
        </div>
      </div>
    </>
  );
}
