import React, { useEffect } from "react";
import styles from "./style.module.scss";
import AOS from "aos";
import Head from "next/head";

function Expertise() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

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
        {/* Autres balises meta spécifiques à cette page si nécessaire */}
      </Head>
      <div className={styles["expertise-container"]}>
        <div className={styles.hero}>
          <div data-aos="fade-right" className={styles.title}>
            <h1>
              Notre Expertise : <br /> Votre protection, notre engagement
            </h1>
            <h2>Une sécurité complète</h2>
            <p className={styles.description}>
              Avec Pixecurity, votre sûreté est entre de bonnes mains à chaque
              étape, de la conception à la certification.
            </p>
          </div>
        </div>
        <div className={styles.forces}>
          <ul>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>
              Des outils électroniques de pointe, taillés sur mesure pour répondre à
              vos besoins.
            </li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>
              Une plateforme de gestion de projets élaborée en interne, offrant une
              interaction aisée avec nos experts.
            </li>

            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>
              Des solutions de développement sur mesure, conçues spécialement pour
              vous.
            </li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>
              Des mesures de cybersécurité avancées pour une protection optimale.
            </li>
            <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
            <li>
              La délivrance de certifications de conformité par nos consultants
              spécialisés.
            </li>
          </ul>
        </div>

        <div className={styles["slides-section"]} id="videoprotection">
          <h2>Vidéoprotection </h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/cam1.jpg" alt="" loading="lazy" />
              <h3>Caméras visibles</h3>
              <h4>La caméra tout-terrain </h4>
              <p>
                De jour comme de nuit les caméras visibles sont exploitées pour de
                la détection, de la reconnaissance ainsi que pour de
                l'identification. <br />
                Pixecurity travaille avec les meilleurs fabricants pour cette
                typologie de caméras.
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/cam2.png" alt="" loading="lazy" />
              <h3>Caméras Thermiques</h3>
              <h4>Augmenter les contrastes</h4>
              <p>
                Les caméras thermiques sont là pour augmenter un maximum les
                contrastes entre l'objet que l'on souhaite détecter et identifier
                et l'environnement dans lequel il se situe. Une préanalyse
                spécifique et poussée permet de sélectionner au plus juste la
                caméra thermique idéale.
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/cam3.jpg" alt="" loading="lazy" />
              <h3>Caméras spécifiques</h3>
              <h4>A chaque situation sa caméra</h4>
              <p>
                Détection de gaz, caméras embarquées, milieux ATEX, mobiles,
                fish-eye... A chaque environnement sa caméra spécifique.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["slides-section"]} id="analyse">
          <h2>Analyse d'image</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/ana1.jpg" alt="" loading="lazy" />
              <h3>Solutions d'analyse en temps réel</h3>
              <h4>Augmentez l'intelligence</h4>
              <p>
                Pixecurity travaille en partenariat avec des logiciels permettant
                la détection d'intrusion, de colis abandonnés, de comptage, de
                machine-learning...
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/ana2.png" alt="" loading="lazy" />
              <h3>Solutions d'analyse a posteriori</h3>
              <h4>Gagnez du temps</h4>
              <p>
                la colorimétrie, la recherche d'individus, d'objets, de véhicules,
                de plaques d'immatriculation, lors d'investigations poussées par
                le client.
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/ana3.jpg" alt="" loading="lazy" />
              <h3>Analyse et Business Intelligence</h3>
              <h4>Allez plus loin</h4>
              <p>
                Mise en place d'outils statistiques sur les taux de fréquentation,
                analyse comportementale, gestion des visiteurs, de la clientèle...
              </p>
            </div>
          </div>
        </div>

        <div className={styles["slides-section"]} id="access">
          <h2>Contrôle d'accès</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/con1.jpg" alt="" loading="lazy" />
              <h3>Gestion des portes et des accès</h3>
              <h4>Un contrôle d'accès VIP</h4>
              <p>
                Depuis tout l'environnement du point d'accès jusqu'à la typologie
                du badge, Pixecurity s'entoure de partenaires qualifiés Niveau 3
                sur les solutions : Til, Primion, Nedap.{" "}
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/con2.png" alt="" loading="lazy" />
              <h3>Architecture sécurisée (ANSSI)</h3>
              <h4>Gagnez du temps</h4>
              <p>
                Un design réfléchi Pixecurity met en place l'architecture
                physique, logicielle et logique pour rester en conformité avec les
                recommandations de la RGPD ainsi que celles de l'ANSSI.{" "}
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/con3.jpg" alt="" loading="lazy" />
              <h3>Solution Full-intégrée (Hypervision)</h3>
              <h4>Une solution unique</h4>
              <p>
                Pixecurity propose une solution vidéo / contrôle d'accès
                full-intégrée via des partenaires travaillant sur une philosophie
                ouverte (Milestone, Til).{" "}
              </p>
            </div>
          </div>
        </div>

        <div className={styles["slides-section"]} id="cloud">
          <h2>Cloud et objets connectés</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/clou1.jpg" alt="" loading="lazy" />
              <h3>Solutions de sûreté full-cloud</h3>
              <h4>Une architecture vidéo et contrôle d'accès full-cloud</h4>
              <p>
                La transition vers le full-cloud est amorcée, Pixecurity propose
                une solution vidéo/contrôle d'accès packagée full-cloud permettant
                de pallier les coûts de stockage, de réseau, de matériel
                informatique. La solution est proposée en achat unique ou en mode
                SAS.
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/clou2.png" alt="" loading="lazy" />
              <h3>Gestion de projet Pixecurity en full-cloud</h3>
              <h4>Pixplatform</h4>
              <p>
                Le monde a changé : la gestion de projet comme le travail se fait
                à distance. Pixecurity vous propose un outil performant, en cloud,
                pour suivre en temps réel vos affaires, vos livraisons... votre
                philosophie de sûreté.
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/clou3.jpg" alt="" loading="lazy" />
              <h3>Objets connectés</h3>
              <h4>Données et rapidité</h4>
              <p>
                La 5G est arrivée, en passant par le drone, les téléphones, les
                télécommandes BIM, la récupération de data n'a jamais été aussi
                facile et rapide. Pixecurity les exploite pour vous et les met en
                musique.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["slides-section"]} id="network">
          <h2>Réseaux, SI, stockage</h2>
          <div className={styles["slide-container"]}>
            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/rese1.jpg" alt="" loading="lazy" />
              <h3>Réseaux</h3>
              <h4>Un savoir-faire à la française</h4>
              <p>
                En physique : Pixecurity possède les plus hautes certifications
                réseau (Cisco) permettant de vous garantir une sécurisation d'un
                bout à l'autre de la chaîne jusqu'à vous amener vers des
                conformités cyber-sécurité. En cloud : Pixecurity met un point
                d'honneur à garantir la sécurisation des données de ses clients
                via un cloud souverain (OVH).
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/rese2.png" alt="" loading="lazy" />
              <h3>Systèmes d'Information</h3>
              <h4>L'environnement c'est vous</h4>
              <p>
                Toute la gestion de votre système d'information en serveur ou en
                mode poste client est paramétrée et configurée selon vos
                pré-requis (active directory, choix matériel).
              </p>
            </div>

            <div className={styles.slide} data-aos="slide-up">
              <img src="./assets/expertise/rese3.jpg" alt="" loading="lazy" />
              <h3>Stockage</h3>
              <h4>Vers l'infini et le Peta</h4>
              <p>
                Que ce soit en capacité ou en typologie de stockage (DAS, NAS,
                SAN), sécurisation des RAID (1, 5, 10), redondance à chaud ou à
                froid (miroir, grappe) Pixecurity certifie son expertise en la
                matière.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expertise;
