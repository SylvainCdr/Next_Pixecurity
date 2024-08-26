import React from "react";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";



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
    <div className={styles.slider}>
      <h1>{t('trustedBy')}</h1>
      <div className={styles.slide_track}>
        {images.map((image, index) => (
          <div className={styles.slide} key={index}>
            <img src={`assets/customersSlider/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
