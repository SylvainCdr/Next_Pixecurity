import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function HomepageSkills() {
  return (
    <div className={styles["skills-container"]}>
      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills1.webp"
          alt=""
        />
        <h3>Vidéoprotection</h3>
        <p>
          L'analyse d'image doit permettre de gagner du temps et de simplifier
          l'experience utilisateur sans être une usine à gaz. Notre savoir faire
          nous permet de vous proposer les meilleurs produits.{" "}
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#videoprotection">
           En savoir plus <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills2.webp"
          alt=""
        />
        <h3>Analyse d'image</h3>
        <p>
          Protections des biens et des personnes, levée de doutes et bien plus
          encore... Pixecurity sélectionne pour vous les meilleures solutions du
          marché : Caméras visibles, thermiques, mobiles, fish-eye...
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#analyse">
          En savoir plus <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills3.webp"
          alt=""
        />
        <h3>Contrôle d'accès</h3>
        <p>
          Suivi, gestion, traçabilité, protection des personnes. Pixecurity
          complète son offre pour vous proposer une solution globale avec les
          leaders du marché.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#access">
          En savoir plus <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills4.webp"
          alt=""
        />
        <h3>Cloud et objets connectés</h3>
        <p>
          Tout objet connecté est aujourd'hui un capteur de sureté devient
          exploitable depuis n'importe quelle interface utilisateur. Pixecurity
          vous propose des solutions innovantes et intélligentes permettant de
          les traiter.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#cloud">
          En savoir plus <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills5.webp"
          alt=""
        />
        <h3>Réseaux SI / Stockage</h3>
        <p>
          Le traitement, le transport et l'exploitation doivent être garantis
          par une expertise métier. Les ingénieurs Pixecurity vous assurent un
          dimensionnement optimal des réseaux, du stockage, des ressources
          informatiques.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#network">
          En savoir plus <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-up" className={styles["skills-card"]}>
        <img
          src="assets/homepage/skills6.webp"
          alt=""
        />
        <h3>Ingénierie</h3>
        <p>
          Notre équipe d'ingénieurs geeks vous propose un accompagnement Niveau
          2-Niveau 3 sur vos systèmes de sureté. Avant vente, suivi de projet,
          mise en service, maintenance, livrables documentaires...
        </p>
        <div className={styles["bottom"]}>
          {/* <Link to="/notre-expertise#engineering">EN SAVOIR PLUS</Link> */}
        </div>
      </div>
    </div>
  );
}
