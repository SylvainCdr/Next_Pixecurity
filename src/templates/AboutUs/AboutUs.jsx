import styles from "./style.module.scss";
import { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
import Head from "next/head";

export default function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

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
          <h1>Qui sommes-nous ?</h1>
          <p>
            Des ingénieurs avant tout. Des ingénieurs 3.0 même. Digital natives,
            branchés BTP, réseaux, technologies appliquées aux bâtiments, veille
            technologique... Bref, de vrais dealers de solutions de sureté prêts
            à tout pour trouver les bons produits adaptés à vos besoins.
          </p>
          <Link href="/contact">
            {" "}
            <button>Un Projet? Parlons en !</button>{" "}
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
                src="../../assets/about1.webp"
                alt=""
                loading="lazy"
              />
            </div>
            <h2>BTP</h2>
            <p>
              Avec des ingénieurs de formation génie civil, Pixecurity conserve
              un ADN travaux, chantier, qui reste l'essence même de notre
              métier.
            </p>
          </div>
          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className={styles.top}>
              <img
                src="../../assets/about2.webp"
                alt=""
                loading="lazy"
              />
            </div>
            <h2>Électronique appliquée</h2>
            <p>
              En complément du génie civil, nos ingénieurs cadres sont formés en
              électronique appliquée : domotique, vidéoprotection, contrôle
              d'accès...
            </p>
          </div>
          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            <div className={styles.top}>
              <img
                src="../../assets/about3.webp"
                alt=""
                loading="lazy"
              />
            </div>
            <h2>IT</h2>
            <p>
              Pixecurity complète son équipe par des ingénieurs réseaux
              certifiés, systèmes, SI...
            </p>
          </div>
        </div>
        <div className={styles["section-3"]}>
          <h3>
            "Notre but ? <br />
            Répondre aux exigences et anticiper les besoins de nos clients.{" "}
            <br />
            Simplifier la compréhension de la sécurité."
          </h3>
          <div className={styles.bottom}>
            <p>-- Yann Duchet, CEO Pixecurity</p>
            <img src="../../assets/team/YANN-aboutUs.jpg" alt="" loading="lazy" />
          </div>
        </div>

        <div className={styles["section-4"]}>
          <h1>L'équipe</h1>
          <ul className={styles["auto-grid"]} role="list">
            {/* <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Yann DUCHET</h2>
              <p>CEO</p>
              <img alt="Yann DUCHET" src="assets/team/YANN.jpg" />
            </div>
          </li> */}
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Kenza GAUTIAM</h2>
                <p>Commerciale</p>
                <img alt="Kenza GAUTIAM" src="assets/team/KENZA.jpeg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Fabien THOMAS</h2>
                <p>Brand Manager</p>
                <img alt="Fabien THOMAS" src="assets/team/FABIEN.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Anaelle Souhaut</h2>
                <p>Chargée d'affaires</p>
                <img alt="Fabien THOMAS" src="assets/team/ANAELLE.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Fabrice VALLEE</h2>
                <p>Commercial grands comptes</p>
                <img alt="Fabrice VALLEE" src="assets/team/FABRICE.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Yanis MEBARKI</h2>
                <p>Commercial</p>
                <img alt="Yanis MEBARKI" src="assets/team/YANNIS.jpg" loading="lazy"/>
              </div>
            </li>

            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Dyhia LAGA</h2>
                <p>Chargée d'étude avant-vente</p>
                <img alt="Dyhia LAGA" src="assets/team/DYHIA.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Jessica FILIALI</h2>
                <p>Assistante de direction</p>
                <img alt="Jessica FILIALI" src="assets/team/JESSICA.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Abdulrhaman SHOUGRI</h2>
                <p>Commercial</p>
                <img
                  alt="Abdulrhaman SHOUGRI"
                  src="assets/team/ABDULRAHMAN.jpg"
                loading="lazy"/>
              </div>
            </li>

            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Élodie TENEUR</h2>
                <p>Technicienne supérieure Systèmes & Réseaux</p>
                <img alt="Élodie TENEUR" src="assets/team/ELODIE.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Miriem BOUSSAHA</h2>
                <p>Développeuse</p>
                <img alt="Anaelle SOUHAUT" src="assets/team/MIRIEM.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Alexis OTTINA</h2>
                <p>Développeur</p>
                <img alt="Alexis OTTINA" src="assets/team/ALEXIS.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Augustin MAHIEU</h2>
                <p>Développeur</p>
                <img alt="Augustin MAHIEU" src="assets/team/AUGUSTIN.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Nathalie JANNOT</h2>
                <p>Assistante de direction</p>
                <img alt="Nathalie JANNOT" src="assets/team/NATHALIE.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Yasmina AOUAM</h2>
                <p>Chargée d'étude avant-vente</p>
                <img alt="Yasmina AOUAM" src="assets/team/YASMINA.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Alex HUBERT</h2>
                <p>Développeur</p>
                <img alt="Alex HUBERT" src="assets/team/ALEX.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Sylvain CADORET</h2>
                <p>Développeur</p>
                <img alt="Sylvain CADORET" src="assets/team/SYLVAIN.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Michael GONFIER</h2>
                <p>Technicien Systèmes & Réseaux</p>
                <img alt="Michael GONFIER" src="assets/team/MICHAEL.jpg" loading="lazy"/>
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Mathieu PACREAU</h2>
                <p>Technicien supérieur Systèmes & Réseaux</p>
                <img
                  alt="Mathieu PACREAU"
                  src="assets/team/MATHIEU_P.jpg"
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>David LEPAGE</h2>
                <p>Chargé d'affaires des projets transports</p>
                <img alt="David LEPAGE" src="assets/team/DAVID.jpg" loading="lazy"/>
              </div>
            </li>
            {/* <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Adrien JOANNY</h2>
              <p>Ingénieur Systèmes & Réseaux</p>
              <img
                alt="Adrien JOANNY"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-J.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Adrien DESDOITS</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Adrien DESDOITS"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-D.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Aziz ARJDAL</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Aziz ARJDAL"
                src="https://www.pixecurity.com/wp-content/uploads/2023/02/Aziz.png"
              />
            </div>
          </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
