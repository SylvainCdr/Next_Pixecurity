import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import AOS from "aos";
import { useEffect } from "react";
import Head from "next/head";

export default function Rse() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Notre démarche RSE | Pixecurity</title>
        <meta
          name="description"
          content="Découvrez l'engagement RSE de Pixecurity : environnement, bien-être au travail, mobilité durable et initiatives responsables."
        />

        <meta
          name="keywords"
          content="RSE, responsabilité sociétale, développement durable, environnement, recyclage, inclusion, bien-être au travail, Pixecurity, mobilité verte, actions responsables, entreprise engagée"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Notre démarche RSE | Pixecurity" />
        <meta
          property="og:description"
          content="Pixecurity agit pour l’environnement, le bien-être des collaborateurs et la responsabilité sociétale."
        />
        <meta
          property="og:image"
          content="https://uploads.pixecurity.com/files/CSR_recycling.webp"
        />
        <meta property="og:url" content="https://www.pixecurity.com/rse" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Notre démarche RSE | Pixecurity" />
        <meta
          name="twitter:description"
          content="Pixecurity agit pour l’environnement, le bien-être des collaborateurs et la responsabilité sociétale."
        />
        <meta
          name="twitter:image"
          content="https://uploads.pixecurity.com/files/CSR_recycling.webp"
        />

        <link rel="canonical" href="https://www.pixecurity.com/rse" />
      </Head>

      <div className={styles.rseContainer}>
        <div className={styles.section1}>
          <div data-aos="fade-up-right" className={styles.section1content}>
            <h1>{t("rse.title")}</h1>
            <p>{t("rse.intro1")}</p>
            <p>{t("rse.intro2")}</p>
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.section2content}>
            <h2>{t("rse.environmentTitle")}</h2>
            <p>{t("rse.environmentIntro")}</p>
          </div>

          <div className={styles.ourActions}>
            <div data-aos="fade-up" className={styles.actionCards}>
              <Image
                src="https://uploads.pixecurity.com/files/CSR_recycling.webp"
                alt="illustration of recycling"
                loading="lazy"
                width={400}
                height={400}
              />
              <h3>{t("rse.waste.title")}</h3>
              <ul>
                <li>{t("rse.waste.point1")}</li>
                <li>{t("rse.waste.point2")}</li>
                <li>{t("rse.waste.point3")}</li>
                <li>{t("rse.waste.point4")}</li>
              </ul>
            </div>

            <div data-aos="fade-up" className={styles.actionCards}>
              <Image
                src="https://uploads.pixecurity.com/files/CSR_plasticbottlefree.webp"
                alt="illustration of a plastic bottle"
                loading="lazy"
                width={400}
                height={400}
              />
              <h3>{t("rse.plastic.title")}</h3>
              <ul>
                <li>{t("rse.plastic.point1")}</li>
                <li>{t("rse.plastic.point2")}</li>
              </ul>
            </div>

            <div data-aos="fade-up" className={styles.actionCards}>
              <Image
                src="https://uploads.pixecurity.com/files/CSR_EV.webp"
                alt="illustration of an electric vehicle"
                loading="lazy"
                width={400}
                height={400}
              />
              <h3>{t("rse.mobility.title")}</h3>
              <ul>
                <li>{t("rse.mobility.point1")}</li>
                <li>{t("rse.mobility.point2")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.section3}>
          <div className={styles.section3content}>
            <h2>{t("rse.socialTitle")}</h2>
            <p>{t("rse.socialIntro")}</p>

            <div className={styles.section3grid}>
              <div className={styles.section3left}>
                <h3>{t("rse.wellbeing.title")}</h3>
                <ul>
                  <li>{t("rse.wellbeing.point1")}</li>
                  <li>{t("rse.wellbeing.point2")}</li>
                  <li>{t("rse.wellbeing.point3")}</li>
                </ul>
              </div>

              <div className={styles.section3right}>
                <h3>{t("rse.inclusion.title")}</h3>
                <ul>
                  <li>{t("rse.inclusion.point1")}</li>
                  <li>{t("rse.inclusion.point2")}</li>
                  <li>{t("rse.inclusion.point3")}</li>
                  <li>{t("rse.inclusion.point4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section4}>
          <div data-aos="flip-left" className={styles.section4content}>
            <h2>{t("rse.commitmentTitle")}</h2>
            <p>{t("rse.commitmentText")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
