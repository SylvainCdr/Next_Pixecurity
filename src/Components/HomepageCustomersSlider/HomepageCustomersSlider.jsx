import React from "react";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const images = [
  "aphp.png",
  "argenteuil.png",
  "channel.png",
  "coquide.png",
  "dps.png",
  "foliateam.png",
  "foncia.png",
  "genelec.png",
  "itq.png",
  "ministere-aff.png",
  "ministere-int.png",
  "ministere-just.png",
  "onet.png",
  "pml.png",
  "primion.png",
  "securitas.png",
  "terideal.png",
];

export default function HomepageCustomersSlider() {
  const { t } = useTranslation();

  return (
    <section className={styles.slider} aria-label={t("trustedBy")}>
      <h2>{t("trustedBy")}</h2>
      <div className={styles.slide_track}>
        {images.map((image) => (
          <div className={styles.slide} key={image}>
            <Image
              src={`/assets/customersSlider/${image}`}
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
