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
      name: "Kenza GAUTIAM",
      role: "Commerciale Grands Comptes",
      src: "/assets/team/KENZA.jpeg",
    },
    {
      name: "Fabien THOMAS",
      role: "Brand Manager",
      src: "/assets/team/FABIEN.jpg",
    },
    {
      name: "Anaelle Souhaut",
      role: "Chargée d'Affaires",
      src: "/assets/team/ANAELLE.jpg",
    },
    {
      name: "Fabrice VALLEE",
      role: "Commercial Grands Comptes",
      src: "/assets/team/FABRICE.jpg",
    },
    {
      name: "Yanis MEBARKI",
      role: "Commercial",
      src: "/assets/team/YANNIS.jpg",
    },
    {
      name: "Dyhia LAGA",
      role: "Chargée d'Etude Avant-Vente",
      src: "/assets/team/DYHIA.jpg",
    },
    {
      name: "Jessica FILIALI",
      role: "Assistante de Direction",
      src: "/assets/team/JESSICA.jpg",
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
      name: "Nathalie JANNOT",
      role: "Assistante de Direction",
      src: "/assets/team/NATHALIE.jpg",
    },
    {
      name: "Yasmina AOUAM",
      role: "Chargée d'Etude Avant-Vente",
      src: "/assets/team/YASMINA.jpg",
    },
    {
      name: "Aziz ARJDAL",
      role: "Technicien Systèmes & Réseaux",
      src: "/assets/team/AZIZ.jpg",
    },
    {
      name: "Sylvain CADORET",
      role: "Développeur",
      src: "/assets/team/SYLVAIN.jpg",
    },
    {
      name: "Michael GONFIER",
      role: "Technicien Systèmes & Réseaux",
      src: "/assets/team/MICHAEL_.webp",
    },
    // {
    //   name: "Amélie CORDIER",
    //   role: "UX/UI Designer",
    //   src: "/assets/team/AMELIE_.webp",
    // },
    {
      name: "Mathieu PACREAU",
      role: "Technicien supérieur Systèmes & Réseaux",
      src: "/assets/team/MATHIEU_P.jpg",
    },
    {
      name: "Adrien DESDOITS",
      role: "Technicien Systèmes & Réseaux",
      src: "/assets/team/ADRIEN_D.jpg",
    },
    {
      name: "Morgane PEREIRA",
      role: "Assistante Administrative",
      src: "/assets/team/MORGANE_.webp",
    },
    {
      name: "David LEPAGE",
      role: "Chargé d'Affaires des Projets Transports",
      src: "/assets/team/DAVID.jpg",
    },
    {
      name: "Vincent ROCHETTE",
      role: "Responsable Commercial Sud",
      src: "/assets/team/VINCENT.webp",
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
        {/* Autres balises meta spécifiques à cette page si nécessaire */}
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
