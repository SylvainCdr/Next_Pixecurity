// Templates/Partner.jsx

import { partners } from "@/Components/HomepagePartners/PartnersData";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import Link from "next/link";
import Head from "next/head";


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
    <>
      <Head>
        <title>{partner.name} - Partenaires</title>
        <meta name="description" content={partner.description} />
        <meta name="keywords" content={partner.keywords} />
        <meta property="og:title" content={partner.name} />
        <meta property="og:description" content={partner.description} />
        <meta property="og:image" content={partner.logo} />
        <meta
          property="og:url"
          content={`https://wwww.pixecurity.com/partenaires/${partner.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixecurity" />

        <link
          rel="canonical"
          href={`https://www.pixecurity.com/partenaires/${partner.slug}`}
        />
      </Head>

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
            <h1>{partner.title1}</h1>
            <p>{partner.text1}</p>
          </section>
          <section>
            {partner.video && (
              <iframe
                className={styles.partnerVideo}
                src={partner.video}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
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
              <h1>{partner.title2}</h1>

              <p>{partner.text2}</p>
            </section>
          </div>
        </div>
        <div className={styles.section3}>
          <div className={styles.section3Content}>
            <section className={styles.partnerDescription}>
              <h1>{partner.title3}</h1>
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
          {partner.products && (
            <Link
              href={partner.products}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir les produits
            </Link>
          )}

          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visiter leur Site Web
          </Link>
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
