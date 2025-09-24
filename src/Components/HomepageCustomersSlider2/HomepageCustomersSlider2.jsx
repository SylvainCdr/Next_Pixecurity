import React from "react";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const images = [
  "santerne.png",
  "vinci.png",
  "eiffage.png",
  "bouygues.png",
  "equans.png",
  "securitas.png",
  "capgemini.png",
  "derichebourg.png",
  "siemens.png",
  "cegelec.png",
  "spie.png",
  "terideal.png",
  "apilog.png",
  "ineo.png",
  "amica.png",
  "genelec.png",
  
];

export default function HomepageCustomersSlider2() {
  const { t } = useTranslation();

  return (
    <section className={styles.slider} aria-label={t("trustedBy")}>
      <h2>{t("trustedBy")}</h2>
      <div className={styles.slide_track}>
        {images.map((image) => (
          <div className={styles.slide} key={image}>
            <Image
              src={`/assets/customersSlider2/${image}`}
              alt={`Logo client ${image.replace(".png", "")}`}
              width={200}
              height={130}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
