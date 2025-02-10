import React, { useEffect } from "react";
import styles from "./style.module.scss";
import AOS from "aos";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import Image from "next/image";

function Expertise() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Notre Expertise - Pixecurity</title>
        <meta
          name="description"
          content="Découvrez l'expertise de Pixecurity dans le domaine de la sûreté, de la vidéoprotection, de l'analyse d'image, du contrôle d'accès, du cloud et des réseaux. Des solutions sur mesure pour assurer votre sécurité."
        />
        <meta
          name="keywords"
          content="expertise, sûreté, vidéoprotection, analyse d'image, contrôle d'accès, cloud, réseaux, sécurité, Pixecurity, solutions de sûreté, caméras, thermiques, sécurité électronique, ANSSI, full-cloud, 5G, stockage, réseau, cyber-sécurité"
        />
        <meta name="author" content="Pixecurity" />

        <link
          rel="preload"
          href="/assets/expertise/expertise.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/expertise/expert-back2.webp"
          as="image"
          type="image/webp"
        />
      </Head>
      <div className={styles["expertise-container"]}>
        <div className={styles.hero}>
        <div className={styles.imageWrapper}>
<Image
  src="/assets/expertise/expertise.webp"
  alt="Hero Image"
  layout="fill"
  objectFit="cover"
  priority // Chargement instantané
/>
</div>
          <div data-aos="fade-right" className={styles.title}>
            <h1>{t("expertiseHeroTitle")}</h1>
            <h2>{t("expertiseHeroSubtitle")}</h2>
            <p className={styles.description}>
              {t("expertiseHeroDescription")}
            </p>
          </div>
        </div>

        <div className={styles.forces}>
          <ul>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>{t("forces.point1")}</li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>{t("forces.point2")}</li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>{t("forces.point3")}</li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>{t("forces.point4")}</li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>{t("forces.point5")}</li>
          </ul>
        </div>

        <div
          className={styles["slides-section"]}
          id="videoprotection"
          data-aos="slide-up"
        >
          <h2>{t("videoProtection.title")}</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide}>
              <Image
                src="/assets/expertise/cam1.jpg"
                alt={t("videoProtection.cam1.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("videoProtection.cam1.title")}</h3>
              <h4>{t("videoProtection.cam1.subtitle")}</h4>
              <p>{t("videoProtection.cam1.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/cam2.png"
                alt={t("videoProtection.cam2.title")}
                loading="lazy"
                width="300"
                height="300"
              />
              <h3>{t("videoProtection.cam2.title")}</h3>
              <h4>{t("videoProtection.cam2.subtitle")}</h4>
              <p>{t("videoProtection.cam2.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/cam3.jpg"
                alt={t("videoProtection.cam3.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("videoProtection.cam3.title")}</h3>
              <h4>{t("videoProtection.cam3.subtitle")}</h4>
              <p>{t("videoProtection.cam3.description")}</p>
            </div>
          </div>
        </div>

        <div
          className={styles["slides-section"]}
          id="analyse"
          data-aos="slide-up"
        >
          <h2>{t("imageAnalysis.title")}</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide}>
              <Image
                src="/assets/expertise/ana1.jpg"
                alt={t("imageAnalysis.realTime.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("imageAnalysis.realTime.title")}</h3>
              <h4>{t("imageAnalysis.realTime.subtitle")}</h4>
              <p>{t("imageAnalysis.realTime.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/ana2.png"
                alt={t("imageAnalysis.postAnalysis.title")}
                loading="lazy"
                width="300"
                height="300"
              />
              <h3>{t("imageAnalysis.postAnalysis.title")}</h3>
              <h4>{t("imageAnalysis.postAnalysis.subtitle")}</h4>
              <p>{t("imageAnalysis.postAnalysis.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/ana3.jpg"
                alt={t("imageAnalysis.businessIntelligence.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("imageAnalysis.businessIntelligence.title")}</h3>
              <h4>{t("imageAnalysis.businessIntelligence.subtitle")}</h4>
              <p>{t("imageAnalysis.businessIntelligence.description")}</p>
            </div>
          </div>
        </div>

        <div
          className={styles["slides-section"]}
          id="access"
          data-aos="slide-up"
        >
          <h2>{t("accessControl.title")}</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide}>
              <Image
                src="/assets/expertise/con1.jpg"
                alt={t("accessControl.doorManagement.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("accessControl.doorManagement.title")}</h3>
              <h4>{t("accessControl.doorManagement.subtitle")}</h4>
              <p>{t("accessControl.doorManagement.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/con2.png"
                alt={t("accessControl.secureArchitecture.title")}
                loading="lazy"
                width="300"
                height="300"
              />
              <h3>{t("accessControl.secureArchitecture.title")}</h3>
              <h4>{t("accessControl.secureArchitecture.subtitle")}</h4>
              <p>{t("accessControl.secureArchitecture.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/con3.jpg"
                alt={t("accessControl.fullIntegratedSolution.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("accessControl.fullIntegratedSolution.title")}</h3>
              <h4>{t("accessControl.fullIntegratedSolution.subtitle")}</h4>
              <p>{t("accessControl.fullIntegratedSolution.description")}</p>
            </div>
          </div>
        </div>

        <div
          className={styles["slides-section"]}
          id="cloud"
          data-aos="slide-up"
        >
          <h2>{t("cloudAndIoT.title")}</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide}>
              <Image
                src="/assets/expertise/clou1.jpg"
                alt={t("cloudAndIoT.fullCloudSolutions.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("cloudAndIoT.fullCloudSolutions.title")}</h3>
              <h4>{t("cloudAndIoT.fullCloudSolutions.subtitle")}</h4>
              <p>{t("cloudAndIoT.fullCloudSolutions.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/clou2.png"
                alt={t("cloudAndIoT.cloudProjectManagement.title")}
                loading="lazy"
                width="300"
                height="300"
              />
              <h3>{t("cloudAndIoT.cloudProjectManagement.title")}</h3>
              <h4>{t("cloudAndIoT.cloudProjectManagement.subtitle")}</h4>
              <p>{t("cloudAndIoT.cloudProjectManagement.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/clou3.jpg"
                alt={t("cloudAndIoT.connectedObjects.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("cloudAndIoT.connectedObjects.title")}</h3>
              <h4>{t("cloudAndIoT.connectedObjects.subtitle")}</h4>
              <p>{t("cloudAndIoT.connectedObjects.description")}</p>
            </div>
          </div>
        </div>

        <div
          className={styles["slides-section"]}
          id="network"
          data-aos="slide-up"
        >
          <h2>{t("networksSIStorage.title")}</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide}>
              <Image
                src="/assets/expertise/rese1.jpg"
                alt={t("networksSIStorage.networks.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("networksSIStorage.networks.title")}</h3>
              <h4>{t("networksSIStorage.networks.subtitle")}</h4>
              <p>{t("networksSIStorage.networks.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/rese2.png"
                alt={t("networksSIStorage.informationSystems.title")}
                loading="lazy"
                width="300"
                height="300"
              />
              <h3>{t("networksSIStorage.informationSystems.title")}</h3>
              <h4>{t("networksSIStorage.informationSystems.subtitle")}</h4>
              <p>{t("networksSIStorage.informationSystems.description")}</p>
            </div>

            <div className={styles.slide}>
              <Image
                src="/assets/expertise/rese3.jpg"
                alt={t("networksSIStorage.storage.title")}
                loading="lazy"
                width="300"
                height="240"
              />
              <h3>{t("networksSIStorage.storage.title")}</h3>
              <h4>{t("networksSIStorage.storage.subtitle")}</h4>
              <p>{t("networksSIStorage.storage.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expertise;
