import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function HomepageSkills() {
  const { t } = useTranslation();

  return (
    <div className={styles["skills-container"]}>
      <div data-aos="fade-up" className={styles["skills-card"]}>
        {/* "skills": {
    "videoprotection": {
      "title": "Vidéoprotection",
      "description": "L'analyse d'image doit permettre de gagner du temps et de simplifier l'expérience utilisateur sans être une usine à gaz. Notre savoir-faire nous permet de vous proposer les meilleurs produits."
    },
    "analyseImage": {
      "title": "Analyse d'image",
      "description": "Protection des biens et des personnes, levée de doutes et bien plus encore... Pixecurity sélectionne pour vous les meilleures solutions du marché : Caméras visibles, thermiques, mobiles, fish-eye..."
    },
    "controleAcces": {
      "title": "Contrôle d'accès",
      "description": "Suivi, gestion, traçabilité, protection des personnes. Pixecurity complète son offre pour vous proposer une solution globale avec les leaders du marché."
    },
    "cloudObjetsConnectes": {
      "title": "Cloud et objets connectés",
      "description": "Tout objet connecté est aujourd'hui un capteur de sûreté devient exploitable depuis n'importe quelle interface utilisateur. Pixecurity vous propose des solutions innovantes et intelligentes permettant de les traiter."
    },
    "reseauxStockage": {
      "title": "Réseaux SI / Stockage",
      "description": "Le traitement, le transport et l'exploitation doivent être garantis par une expertise métier. Les ingénieurs Pixecurity vous assurent un dimensionnement optimal des réseaux, du stockage, des ressources informatiques."
    },
    "ingenierie": {
      "title": "Ingénierie",
      "description": "Notre équipe d'ingénieurs geeks vous propose un accompagnement Niveau 2-Niveau 3 sur vos systèmes de sûreté. Avant-vente, suivi de projet, mise en service, maintenance, livrables documentaires..."
    }
  },
  "learnMore": "En savoir plus", */}
        <img
          src="/assets/homepage/skills1.webp"
          alt={t("skills.videoprotection.title")}
          loading="lazy"
        />
        <h3>{t("skills.videoprotection.title")}</h3>
        <p>{t("skills.videoprotection.description")}</p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise-en-solutions-de-surete#videoprotection">
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
          <Link href="/notre-expertise-en-solutions-de-surete#analyse">
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
          <Link href="/notre-expertise-en-solutions-de-surete#access">
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
          <Link href="/notre-expertise-en-solutions-de-surete#cloud">
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
          <Link href="/notre-expertise-en-solutions-de-surete#network">
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
          <Link href="/qui-sommes-nous">
            {t("learnMore")} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
