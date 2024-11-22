import styles from "./style.module.scss";
import Link from "next/link";
import Head from "next/head";

export default function PartnersWhatsUp() {
  return (
    <>
      <Head>
        <title>Actualités de Nos Partenaires</title>
        <meta
          name="description"
          content="Découvrez les actualités et annonces importantes de nos partenaires de confiance. Leurs innovations et leurs solutions avancées renforcent notre mission : vous offrir une sécurité de pointe. Restez à jour avec les leaders du secteur."
        />
        <meta property="og:title" content="Actualités de Nos Partenaires" />
        <meta
          property="og:description"
          content="Découvrez les actualités et annonces importantes de nos partenaires de confiance. Leurs innovations et leurs solutions avancées renforcent notre mission : vous offrir une sécurité de pointe. Restez à jour avec les leaders du secteur."
        />

        <meta
          name="keywords"
          content="actualités, partenaires, sécurité, sûreté, videoprotection, caméra, contrôle d'accès, innovation, solutions, leaders, i-pro, vivotek, milestone, bosch, vuwall, zyxel"
        />
      </Head>

      <div className={styles.partnersWhatsUpContainer}>
        <div className={styles.partnersWhatsUpHeader}>
          <div className={styles.headerLeft}>
            <h1>Actualités de Nos Partenaires</h1>
            <p>
              Découvrez les actualités et annonces importantes de nos
              partenaires de confiance. Leurs innovations et leurs solutions
              avancées renforcent notre mission : vous offrir une sécurité de
              pointe. Restez à jour avec les leaders du secteur.
            </p>
          </div>
          <div className={styles.headerRight}></div>
        </div>

        <iframe
          width="1350"
          height="3000"
          src="https://rss.app/embed/v1/wall/_uW33og8IouUH8pL5"
          frameborder="0"
        ></iframe>

        {/* // Lien vers la boutique en ligne et nous contacter */}
        <div className={styles.links}>
         
            <Link href="/boutique">  <button>Visiter la Boutique</button></Link>
          
          
            <Link href="/contact"> <button>
              Un Projet ? Contactez-nous
            
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}
