// Templates/Partner.jsx

import { partners } from "@/Components/HomepagePartners/PartnersData";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import Link from "next/link";

const PartnerPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Attendre que le `slug` soit disponible
  if (!slug) {
    return <p>Chargement...</p>;
  }

  // Trouver le partenaire correspondant au slug
  const partner = partners.find((p) => p.slug === slug);

  // Vérifiez si le partenaire existe
  if (!partner) {
    return <h1>Partenaire non trouvé</h1>;
  }

  return (
    <div className={styles.partnerContainer}>
      <div className={styles.partnerHeader}>
        <h1 className={styles.partnerTitle}>{partner.name}</h1>
        <img
          src={partner.logo}
          alt={`Logo de ${partner.name}`}
          loading="lazy"
          className={styles.partnerLogo}
        />
      </div>
      <div className={styles.section1}>
        <section className={styles.partnerDescription}>
          {/* <p>{partner.description}</p> */}
          <h2>{partner.title1}</h2>
          <p>{partner.text1}</p>
        </section>
        <section>
          <iframe
            className={styles.partnerVideo}
            src={partner.video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>
      </div>
      <div className={styles.section2}>
        <div className={styles.section2Content}>
          <section className={styles.partnerImage}>
            <img
              src={partner.image1}
              alt={`Illustration de ${partner.name}`}
              loading="lazy"
              className={styles.brandIllustration}
            />
          </section>
          <section className={styles.partnerDescription}>
            {/* <p>{partner.description}</p> */}
            <h2>{partner.title2}</h2>
            <p>{partner.text2}</p>
          </section>
        </div>
      </div>
      <div className={styles.section3}>
      <div className={styles.section3Content}>
      
          <section className={styles.partnerDescription}>
        <h2>{partner.title3}</h2>
        <p>{partner.text3}</p>
        </section>
        <section className={styles.partnerImage}>
            <img
              src={partner.image2}
              alt={`Illustration de ${partner.name}`}
              loading="lazy"
              className={styles.brandIllustration}
            />
          </section>
      </div>
      </div>

      <div className={styles.section4}>
        <Link
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.websiteLink}
        >
          Visitez leur site Web
        </Link>
      </div>
    </div>
  );
};

export default PartnerPage;
