import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles["footer-container"]}>
      <div className={styles["section-1"]}>
        <img src="/assets/logo-dark.svg" alt="Logo Pixecurity" loading="lazy" />
        <p>{t("footer.description")}</p>
      </div>
      <div className={styles["section-2"]}>
        <img
          className={styles.mase}
          src="/assets/icons/mase.png"
          alt="Logo MASE"
          loading="lazy"
        />
      </div>
      <div className={styles["section-3"]}>
        <h4>{t("footer.siteMap")}</h4>
        <ul>
          <Link href="/">
            <li>{t("footer.home")}</li>
          </Link>
          <Link href="/boutique">
            <li>{t("footer.shop")}</li>
          </Link>
          <Link href="/notre-expertise-en-solutions-de-surete">
            <li>{t("footer.expertise")}</li>
          </Link>
          <Link href="/inscription">
            <li>{t("footer.signupLogin")}</li>
          </Link>
          <Link href="/qui-sommes-nous">
            <li>{t("footer.aboutUsLink")}</li>
          </Link>
          <Link href="/partenaires-leaders-en-securite-et-surveillance">
            <li>{t("footer.partnersLink")}</li>
          </Link>
          <Link href="/devis-securite-surveillance">
            <li>{t("footer.quotationLink")}</li>
          </Link>
          <Link href="/contact">
            <li>{t("footer.contactLink")}</li>
          </Link>
          <Link href="/actualites-de-nos-partenaires">
            <li>{t("footer.partnersActus")}</li>
          </Link>
        </ul>
      </div>

      <div className={styles["section-4"]}>
        <h4>{t("footer.contactUs")}</h4>
        <ul>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <Link href="mailto:pixecurity@pixecurity.com">
              {t("footer.email")}
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            {t("footer.phone")}
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i> {t("footer.address")}
          </li>
          <li>
            <i className="fa-brands fa-linkedin"></i>
            <Link href="https://www.linkedin.com/company/pixecurity/">
              {t("footer.linkedin")}
            </Link>
          </li>
          <p className={styles.copyright}>{t("footer.copyright")}</p>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
