import { useTranslation } from "next-i18next";
import styles from "./style.module.scss";
import Link from "next/link";

export default function HompepageLearnMoreMap() {
  const { t } = useTranslation();

  return (
    <div className={styles.learnMore}>
      <div className={styles.learnMoreMap}>
        <div className={styles.mapLeft}>
          <h3>{t("home.pixecurityPresence")}</h3>
          <p>{t("home.pixecurityExpertise")}</p>
          <p>{t("home.pixecurityRegions")}</p>

          <ul>
            <li>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <strong>{t("home.paris")}</strong> – {t("home.parisDescription")}
            </li>

            <li>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <strong>{t("home.lille")}</strong> – {t("home.lilleDescription")}
            </li>
            <li>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <strong>{t("home.bordeaux")}</strong> –{" "}
              {t("home.bordeauxDescription")}
            </li>
            <li>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <strong>{t("home.lyon")}</strong> – {t("home.lyonDescription")}
            </li>
          </ul>
        </div>
        <figure className={styles.mapRight}>
          <img src="/assets/homepage/map2.webp" alt={t("home.mapAltText")} />
          <figcaption className="sr-only">
            {t("home.pixecurityPresence")} – {t("home.pixecurityRegions")}
          </figcaption>
        </figure>
      </div>

      <div className={styles.learnMoreCTA}>
        <h4> Ready to learn more ? </h4>
    <Link href="/contact" className={styles.ctaButton}>
  {t("home.contactUs")}
</Link>

      </div>
    </div>
  );
}
