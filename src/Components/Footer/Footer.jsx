import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["section-1"]}>
        <img src="/assets/logo-dark.svg" alt="Logo Pixecurity" loading="lazy" />
        <p>
          Fournisseur de solutions de sureté intelligentes :
          Vidéosurveillance, analyse d'image, contrôle d'accès, réseaux/stockage
          des données, hypervision...
        </p>
      </div>
      <div className={styles["section-2"]}>
        <img className={styles.mase} src="/assets/icons/mase.png" alt="Logo MASE" loading="lazy" />
      </div>
      <div className={styles["section-3"]}>
        <h4>Plan du site </h4>
        <ul>
          <Link href="/">
            <li>Accueil</li>
          </Link>
          <Link href="/boutique">
            <li>Boutique</li>
          </Link>
          <Link href="/notre-expertise">
            <li>Notre expertise</li>
          </Link>
          <Link href="/inscription">
            <li>Inscription / Connexion</li>
          </Link>
          <Link href="/a-propos">
            <li>Qui sommes-nous ?</li>
          </Link>
          <Link href="/partenaires">
            <li>Nos partenaires</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>

      <div className={styles["section-4"]}>
        <h4>Nous contacter </h4>
        <ul>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <Link href="mailto:pixecurity@pixecurity.com">
              pixecurity@pixecurity.com
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>(+33) 1 39 60 98 82
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i> 38 Rue Jean Mermoz
            <br /> 78600 Maisons-Laffitte
          </li>
          <li>
            <i className="fa-brands fa-linkedin"></i>
            <Link href="https://www.linkedin.com/company/pixecurity/">Linkedin</Link>
          </li>
           <p className={styles.copyright}>&copy; 2024 Pixecurity. Tous droits réservés.</p> 
        </ul>
      </div>
    </div>
  );
}

export default Footer;
