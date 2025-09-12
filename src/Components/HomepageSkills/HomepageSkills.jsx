import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function HomepageSkills() {
  const { t } = useTranslation();

  const skillsData = [
    {
      key: "videoprotection",
      img: "/assets/homepage/skills1.webp",
      link: "/notre-expertise-en-solutions-de-surete#videoprotection",
    },
    {
      key: "analyseImage",
      img: "/assets/homepage/skills2.webp",
      link: "/notre-expertise-en-solutions-de-surete#analyse",
    },
    {
      key: "controleAcces",
      img: "/assets/homepage/skills3.webp",
      link: "/notre-expertise-en-solutions-de-surete#access",
    },
    {
      key: "cloudObjetsConnectes",
      img: "/assets/homepage/skills4.webp",
      link: "/notre-expertise-en-solutions-de-surete#cloud",
    },
    {
      key: "reseauxStockage",
      img: "/assets/homepage/skills5.webp",
      link: "/notre-expertise-en-solutions-de-surete#network",
    },
    {
      key: "ingenierie",
      img: "/assets/homepage/skills6.webp",
      link: "/qui-sommes-nous",
    },
  ];

  return (
    <div className={styles["skills-container"]}>
      {skillsData.map(({ key, img, link }) => (
        <figure className={styles["skills-card"]} data-aos="fade-up">
          <Image
            src={img}
            alt={t(`skills.${key}.title`)}
            loading="lazy"
            width={400}
            height={300}
          />
          <figcaption>
            <h2>{t(`skills.${key}.title`)}</h2>
            <p>{t(`skills.${key}.description`)}</p>
            <div className={styles.bottom}>
              <Link href={link}>
                {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
