import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { partners } from "../../Components/HomepagePartners/PartnersData";
import AOS from "aos";
import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  // Group partners by domain
  const groupedPartners = partners.reduce((acc, partner) => {
    (acc[partner.domain] = acc[partner.domain] || []).push(partner);
    return acc;
  }, {});

  // Map each domain to an image URL
  const domainImages = {
    Caméras:
      "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    VMS: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Réseaux:
      "https://images.unsplash.com/photo-1509130298739-651801c76e96?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Contrôle d'accès":
      "https://images.unsplash.com/photo-1444738720667-27446e3f293d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Gestion & Analyse d'image":
      "https://images.unsplash.com/photo-1486108334972-f02b6c78ba07?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const { t } = useTranslation();

  return (
    <div className={styles["partners-container"]}>
      <Head>
        <title>Nos partenaires - Pixecurity</title>
        <meta
          name="description"
          content="Découvrez nos partenaires de confiance, leaders mondiaux en sécurité et surveillance. Pixecurity collabore avec des entreprises innovantes pour vous offrir les meilleures solutions de sécurité."
        />
        {/* Ajoutez d'autres balises meta au besoin */}
        <meta
          name="keywords"
          content="partenaires, sécurité, surveillance, solutions, Pixecurity, surveillance IP, gestion vidéo,  contrôle d'accès, tranquillité d'esprit, galerie, entreprises, produits, sécurité de haute qualité, bosch, vivotek, i-pro, zyxel, vms, milestone, til techonologies, i-pro, zyxel, cisco, comnet, vuwall, briefcam, technoaware "
        />
      </Head>

      <div className={styles["partners-section1"]}>
        <div className={styles["partners-intro"]}>
          <h1>{t("partnersHeroTitle")}</h1>
          <h2> {t("partnersHeroSubtitle")}</h2>

          <p> {t("partnersHeroDescription1")}</p>
          <p> {t("partnersHeroDescription2")}</p>
          <p> {t("partnersHeroDescription3")}</p>

          {/* <p>
            Chez Pixecurity, nous nous engageons à vous fournir les meilleures
            solutions disponibles, grâce à des collaborations avec des
            entreprises innovantes et réputées.
          </p>
          <p>
            Chaque partenaire apporte son expertise et ses technologies de
            pointe, couvrant une vaste gamme de besoins : surveillance IP,
            gestion vidéo, contrôle d'accès et bien plus. Nos partenaires
            offrent des solutions avancées pour protéger vos biens et garantir
            votre tranquillité d'esprit.
          </p>
          <p>
            Parcourez notre galerie pour en savoir plus sur ces entreprises et
            leurs produits. Nous sommes fiers de travailler avec ces acteurs
            majeurs pour vous offrir des solutions de sécurité de la plus haute
            qualité.
          </p>
          <p>
            Bienvenue chez Pixecurity, où votre sécurité est notre priorité.
          </p> */}
        </div>

        <div data-aos="fade-down" className={styles["partner-img"]}></div>
      </div>

      {Object.keys(groupedPartners).map((domain, domainIndex) => (
        <div key={domainIndex} className={styles["domain-title"]}>
          <h2>{domain}</h2>
          <img
            src={domainImages[domain]}
            className={styles.domainImg}
            alt={domain}
            loading="lazy"
          />
          {groupedPartners[domain].map((partner, partnerIndex) => {
            const isExpanded =
              expandedDescriptions[`${domainIndex}-${partnerIndex}`];
            const description = partner.description;
            const shortDescription = description.slice(0, 300);

            return (
              <div
                key={partnerIndex}
                className={`${styles["partners-section2"]} ${partnerIndex % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles["partner-logo"]}>
                  <Link href={partner.website} target="_blank" rel="noreferrer">
                  <h1 className={styles.partnerName}> {partner.name}</h1>
                    <img
                      data-aos="zoom-in"
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className={styles["partner-info"]}>
                  <p>
                    {isExpanded ? description : `${shortDescription}...`}
                    {description.length > 100 && (
                      <span
                        className={styles["toggle-description"]}
                        onClick={() =>
                          toggleDescription(`${domainIndex}-${partnerIndex}`)
                        }
                      >
                        {isExpanded ? " moins" : " plus"}
                      </span>
                    )}
                  </p>
                  <Link href={partner.website} target="_blank" rel="noreferrer">
                    en savoir plus
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default Partners;
