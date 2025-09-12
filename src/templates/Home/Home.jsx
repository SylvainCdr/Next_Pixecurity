import React, { useEffect } from "react";
import styles from "./style.module.scss";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Head from "next/head";
import HomepageSkills from "@/Components/HomepageSkills/HomepageSkills";
import HomepagePartners from "@/Components/HomepagePartners/HomepagePartners";
import HomepageHero2 from "@/Components/HomepageHero2/HomepageHero2";
import HompepageLearnMoreMap from "@/Components/HomepageLearnMoreMap/HomepageLearnMoreMap";
import Image from "next/image";

export default function Home() {
  // on importe AOS dynamiquement pour éviter les problèmes de SSR
  useEffect(() => {
    (async () => {
      const AOS = (await import("aos")).default;
      await import("aos/dist/aos.css");
      AOS.init({ duration: 1500 });
    })();
  }, []);

  const { t } = useTranslation();

  // imports dynamiques des composants pour le SSR et performance
  const HomepageCustomersSlider = dynamic(
    () =>
      import("@/Components/HomepageCustomersSlider/HomepageCustomersSlider"),
    { ssr: false }
  );

  const HomepageCountUp = dynamic(
    () => import("@/Components/HomepageCountUp/HomepageCountUp"),
    { ssr: false }
  );

  const LinkedInFeed = dynamic(
    () =>
      Promise.resolve(() => (
        <div style={{ width: "100%", height: 440 }}>
          <iframe
            width="100%"
            height="440"
            src="https://rss.app/embed/v1/carousel/HvV50piN6NgpW3kC"
            frameBorder="0"
            title="pixecurity linkedin feed"
            loading="lazy"
          />
        </div>
      )),
    { ssr: false }
  );

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
          content="Découvrez Pixecurity, leader dans la sûreté 3.0. Nous proposons des solutions intelligentes de vidéosurveillance, contrôle d'accès, analyse d'image et hypervision pour protéger vos biens et assurer votre sécurité."
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
      </Head>

      <div className={styles["homepage-container"]}>
        <HomepageHero2 />
        <div className={styles["section2-offer"]}>
          <h3>{t("home.offerTitle")}</h3>
          <p>{t("home.offerDescription1")}</p>
          <p>{t("home.offerDescription2")}</p>
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

        <div className={styles.newPartner}>
          <a href="https://diviniti.tech">
            <Image
              className={styles.newPartnerImg}
              src="/assets/shop/banners/banner5.webp"
              alt="Diviniti partner"
              width={1400}
              height={400}
              loading="lazy"
            />
          </a>
        </div>

        <HomepageCountUp />

        <HomepageCustomersSlider />

        <HompepageLearnMoreMap />
        <div className={styles.linkedinFeedCarousel}>
          <LinkedInFeed />
        </div>
      </div>
    </>
  );
}
