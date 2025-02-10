import styles from "./style.module.scss";
import { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";

export default function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Fabrice VALLEE",
      role: "Commercial Grands Comptes",
      src: "/assets/team/FABRICE.jpg",
    },
    {
      name: "Fabien THOMAS",
      role: "Brand Manager",
      src: "/assets/team/FABIEN.jpg",
    },
    {
      name: "Anaelle SOUHAUT",
      role: "Chargée d'Affaires",
      src: "/assets/team/ANAELLE.jpg",
    },
    {
      name: "Kenza GAUTIAM",
      role: "Commerciale Grands Comptes",
      src: "/assets/team/KENZA.jpeg",
    },

    {
      name: "Abdulrhaman SHOUGRI",
      role: "Commercial",
      src: "/assets/team/ABDULRAHMAN.jpg",
    },
    {
      name: "Adrien JOANNY",
      role: "Ingénieur Systèmes & Réseaux",
      src: "/assets/team/ADRIEN_J.jpg",
    },
    {
      name: "Dyhia LAGA",
      role: "Chargée d'Etude Avant-Vente",
      src: "/assets/team/DYHIA.jpg",
    },
    {
      name: "Mathieu PACREAU",
      role: "Technicien Supérieur Systèmes & Réseaux",
      src: "/assets/team/MATHIEU_P.jpg",
    },
    {
      name: "David LEPAGE",
      role: "Chargé d'Affaires des Projets Transports",
      src: "/assets/team/DAVID.jpg",
    },
    {
      name: "Nathalie JANNOT",
      role: "Assistante de Direction",
      src: "/assets/team/NATHALIE.jpg",
    },
    {
      name: "Michael GONFIER",
      role: "Technicien de Mise en Service",
      src: "/assets/team/MICHAEL_.webp",
    },

    {
      name: "Adrien DESDOITS",
      role: "Technicien de Mise en Service",
      src: "/assets/team/ADRIEN_D.jpg",
    },
    {
      name: "Jessica FILIALI",
      role: "Assistante de Direction",
      src: "/assets/team/JESSICA.jpg",
    },

    {
      name: "Aziz ARJDAL",
      role: "Technicien de Mise en Service Supérieur ",
      src: "/assets/team/AZIZ.jpg",
    },
    {
      name: "Sylvain CADORET",
      role: "Développeur",
      src: "/assets/team/SYLVAIN.jpg",
    },

    {
      name: "Yasmina AOUAM",
      role: "Chargée d'Etude Avant-Vente",
      src: "/assets/team/YASMINA.jpg",
    },

    {
      name: "Vincent ROCHETTE",
      role: "Responsable Commercial Sud-Est",
      src: "/assets/team/VINCENT.webp",
    },
    {
      name: "Antoine COUDERT",
      role: "Commercial",
      src: "/assets/team/ANTOINE.webp",
    },
    {
      name: "Morgane PEREIRA",
      role: "Assistante Administrative",
      src: "/assets/team/MORGANE_.webp",
    },
    {
      name: "Hector RICHARD",
      role: "Technicien de Mise en Service",
      src: "/assets/team/HECTOR.webp",
    },
    {
      name: "Stecie RAZA",
      role: "Chargée de Communication & Marketing",
      src: "/assets/team/STECIE_.webp",
    },
    {
      name: "Hiba BOUREZG",
      role: "Alternante Ingénieur Réseaux & CyberSécurité",
      src: "/assets/team/HIBA_.jpg",
    },
    {
      name: "Eric SWORNOWSKI",
      role: "Commercial Sud-Ouest",
      src: "/assets/team/ERIC_.webp",
    },
  ];

  return (
    <>
      <Head>
        <title>À propos - Pixecurity</title>
        <meta
          name="description"
          content="Découvrez Pixecurity, des ingénieurs 3.0 spécialisés en sécurité, génie civil, électronique appliquée et IT, prêts à fournir des solutions de sûreté adaptées à vos besoins."
        />
        <meta
          name="keywords"
          content="sécurité, solutions de sûreté, protection, surveillance, Pixecurity, france, paris, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
        <meta name="author" content="Pixecurity" />

        <link
          rel="preload"
          href="/assets/aboutUs/cube4.webp"
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

      <div className={styles["aboutUs-container"]}>
        <div className={styles["section-1"]}>
          <h1>{t("aboutUs.title")}</h1>
          <p>{t("aboutUs.section1.text")}</p>
          <Link href="/contact">
            <button>{t("aboutUs.section1.button")}</button>
          </Link>
        </div>

        <div className={styles["section-2"]}>
          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className={styles.top}>
              <img
                src={t("aboutUs.section2.cards.imgSrc1")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title1")}</h2>
            <p>{t("aboutUs.section2.cards.text1")}</p>
          </div>

          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className={styles.top}>
              <img
                src={t("aboutUs.section2.cards.imgSrc2")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title2")}</h2>
            <p>{t("aboutUs.section2.cards.text2")}</p>
          </div>

          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            <div className={styles.top}>
              <img
                src={t("aboutUs.section2.cards.imgSrc3")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title3")}</h2>
            <p>{t("aboutUs.section2.cards.text3")}</p>
          </div>
        </div>

        <div className={styles["section-3"]}>
          <h3
            dangerouslySetInnerHTML={{ __html: t("aboutUs.section3.quote") }}
          />
          <div className={styles.bottom}>
            <p>{t("aboutUs.section3.author")}</p>
            <img
              src={t("aboutUs.section3.imgSrc")}
              alt=""
              loading="lazy"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className={styles["section-4"]}>
          <h1>{t("aboutUs.section4.title")}</h1>
          <h2>{t("aboutUs.section4.subtitle")}</h2>
          <ul className={styles["auto-grid"]} role="list">
            {teamMembers.map((member, index) => (
              <li key={index}>
                <div className={styles.profile}>
                  <h2 className={styles["profile__name"]}>{member.name}</h2>
                  <p>{member.role}</p>
                  <Image
                    alt={member.name}
                    src={member.src}
                    loading="lazy"
                    width={300}
                    height={300}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
