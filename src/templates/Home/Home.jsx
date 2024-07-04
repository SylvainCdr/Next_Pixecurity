import React, { useEffect } from "react";
import styles from "./style.module.scss";
import HomepageCustomersSlider from "../../Components/HomepageCustomersSlider/HomepageCustomersSlider";
import Hero from "@/Components/HomepageHero/HomepageHero";
import Link from "next/link";
import AOS from "aos";
import HomepageCountUp from "../../Components/HomepageCountUp/HomepageCountUp";
import HomepagePartners from "../../Components/HomepagePartners/HomepagePartners";
import HomepageSkills from "../../Components/HomepageSkills/HomepageSkills";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className={styles["homepage-container"]}>
      <Hero />

      <div className={styles["section2-offer"]}>
        <h2>Une offre pensée autrement</h2>
        <p>
          La protection de vos données personnelles certifiée Pixecurity c'est :
          la fourniture d'outils électroniques, une plateforme de gestion de
          projets réalisée en propre pour faciliter l'interaction avec nos
          experts, des développements spécifiques et sur mesure, la mise en
          place de solutions cyber. <br />
          Des certifications de conformités delivrées par nos consultants sur du
          compliance : Pixecurity couvre toute la haute chaine de valeur de la
          sureté. Pixecurity est le fournisseur de solutions de sureté 3.0
        </p>
      </div>

      <HomepageSkills />

      <div className={styles["section4-aboutUs"]}>
        <div className={styles["section4-text"]}>
          <h2>Qui sommes nous ?</h2>
          <p>
            Des ingénieurs avant-gardistes. Des experts 3.0, natifs du
            numérique, spécialisés dans le BTP, les réseaux, les technologies du
            bâtiment, et toujours à l'affût des dernières avancées
            technologiques. Ce sont de véritables artisans de la sûreté,
            déterminés à dénicher les solutions les plus adaptées à vos
            exigences.
          </p>
          <Link href="/a-propos">
            <button>Notre équipe</button>
          </Link>
        </div>
        <div className={styles["section4-img"]}></div>
      </div>

      <HomepagePartners />
      <HomepageCountUp />

      <HomepageCustomersSlider />

      <div className={styles.learnMore}>
        <h5> Ready to learn more ? </h5>
        <Link href="/contact" > <button>Contactez-nous </button> </Link>
      </div>
    </div>
  );
}
