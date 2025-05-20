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
          <li>
            <Link href="/">{t("footer.home")}</Link>
          </li>
          <li>
            <Link href="/boutique">{t("footer.shop")}</Link>
          </li>
          <li>
            {" "}
            <Link href="/notre-expertise-en-solutions-de-surete">
              {t("footer.expertise")}
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/inscription">{t("footer.signupLogin")}</Link>
          </li>
          <li>
            {" "}
            <Link href="/qui-sommes-nous">{t("footer.aboutUsLink")}</Link>
          </li>
          <li>
            <Link href="/partenaires-leaders-en-securite-et-surveillance">
              {t("footer.partnersLink")}
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/devis-securite-surveillance">
              {t("footer.quotationLink")}
            </Link>
          </li>
          <li>
            <Link href="/contact">{t("footer.contactLink")}</Link>
          </li>
          <li>
            <Link href="/politique-de-confidentialite">{t("footer.privacyLink")}</Link>
          </li>
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
