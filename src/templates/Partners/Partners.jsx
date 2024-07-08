import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { partners } from "../../Components/HomepagePartners/PartnersData";
import AOS from "aos";
import Link from "next/link";

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
    "Vidéoprotection": "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "VMS": "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Réseaux": "https://images.unsplash.com/photo-1452696193712-6cabf5103b63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Contrôle d'accès": "https://images.unsplash.com/photo-1444738720667-27446e3f293d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // Add other domains and their corresponding images here
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles["partners-container"]}>
      <div className={styles["partners-section1"]}>
        <div className={styles["partners-intro"]}>
          <h1>Nos partenaires</h1>
          <h2>Découvrez nos partenaires de confiance, leaders mondiaux en sécurité
            et surveillance.</h2>
          <p>
             Chez Pixecurity, nous nous engageons à vous fournir
            les meilleures solutions disponibles, grâce à des collaborations
            avec des entreprises innovantes et réputées.
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
          </p>
        </div>

        <div data-aos="fade-down" className={styles["partner-img"]}></div>
      </div>

      {Object.keys(groupedPartners).map((domain, domainIndex) => (
        <div key={domainIndex} className={styles["domain-title"]}>
          <h2>{domain}</h2>
          <img src={domainImages[domain]} className={styles.domainImg} alt={domain} />
          {groupedPartners[domain].map((partner, partnerIndex) => {
            const isExpanded = expandedDescriptions[`${domainIndex}-${partnerIndex}`];
            const description = partner.description;
            const shortDescription = description.slice(0, 300);

            return (
              <div
                key={partnerIndex}
                className={`${styles["partners-section2"]} ${partnerIndex % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles["partner-logo"]}>
                  <a href={partner.website} target="_blank" rel="noreferrer">
                    <img
                      data-aos="zoom-in"
                      src={partner.logo}
                      alt={partner.name}
                    />
                  </a>
                </div>
                <div className={styles["partner-info"]}>
                  <p>
                    {isExpanded ? description : `${shortDescription}...`}
                    {description.length > 100 && (
                      <span
                        className={styles["toggle-description"]}
                        onClick={() => toggleDescription(`${domainIndex}-${partnerIndex}`)}
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
