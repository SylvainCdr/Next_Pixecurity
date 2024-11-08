import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function HomepageSkills() {
  const { t } = useTranslation();

  return (
    <div className={styles["skills-container"]}>
      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills1.webp"
          alt={t("skills.videoprotection.title")}
          loading="lazy"
        />
        <h3>{t("skills.videoprotection.title")}</h3>
        <p>{t("skills.videoprotection.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#videoprotection">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills2.webp"
          alt={t("skills.analyseImage.title")}
          loading="lazy"
        />
        <h3>{t("skills.analyseImage.title")}</h3>
        <p>{t("skills.analyseImage.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#analyse">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills3.webp"
          alt={t("skills.controleAcces.title")}
          loading="lazy"
        />
        <h3>{t("skills.controleAcces.title")}</h3>
        <p>{t("skills.controleAcces.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#access">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills4.webp"
          alt={t("skills.cloudObjetsConnectes.title")}
          loading="lazy"
        />
        <h3>{t("skills.cloudObjetsConnectes.title")}</h3>
        <p>{t("skills.cloudObjetsConnectes.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#cloud">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills5.webp"
          alt={t("skills.reseauxStockage.title")}
          loading="lazy"
        />
        <h3>{t("skills.reseauxStockage.title")}</h3>
        <p>{t("skills.reseauxStockage.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#network">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="/assets/homepage/skills6.webp"
          alt={t("skills.ingenierie.title")}
          loading="lazy"
        />
        <h3>{t("skills.ingenierie.title")}</h3>
        <p>{t("skills.ingenierie.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/a-propos">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
