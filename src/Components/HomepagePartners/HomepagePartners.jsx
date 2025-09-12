import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { partners } from "../../Components/HomepagePartners/PartnersData";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function HomepagePartners() {
  const { t } = useTranslation();

  return (
    <div className={styles["homepagePartners-container"]}>
      <div className={styles["partners-logo"]}>
        {partners.map((partner, index) => (
          <a
            key={partner.slug}
            href={`/partenaires-leaders-en-securite-et-surveillance/${partner.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              loading="lazy"
              width={150}
              height={150}
            />
          </a>
        ))}
      </div>
      <div className={styles["partners-text"]}>
        <h2>{t("homepagePartners.partnersTitle")}</h2>
        <h4>{t("homepagePartners.partnersSubtitle")}</h4>
        <p>{t("homepagePartners.partnersDescription")}</p>
        <Link href="/partenaires-leaders-en-securite-et-surveillance">
          <button>{t("homepagePartners.learnMore")}</button>
        </Link>
      </div>
    </div>
  );
}
