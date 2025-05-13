import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import AOS from "aos";
import { useEffect } from "react";

export default function Rse() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className={styles.rseContainer}>
      <div className={styles.section1}>
        <div data-aos="fade-up-right" className={styles.section1content}>
          <h1>{t("rse.title")}</h1>
          <p>{t("rse.intro1")}</p>
          <p>{t("rse.intro2")}</p>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles.section2content}>
          <h2>{t("rse.environmentTitle")}</h2>
          <p>{t("rse.environmentIntro")}</p>
        </div>

        <div className={styles.ourActions}>
          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://t3.ftcdn.net/jpg/03/98/50/44/240_F_398504440_8mgFm6ZDIIjBL7wa7GUA9WkmoEQ03bb2.jpg"
              alt=""
              loading="lazy"
            />
            <h3>{t("rse.waste.title")}</h3>
            <ul>
              <li>{t("rse.waste.point1")}</li>
              <li>{t("rse.waste.point2")}</li>
              <li>{t("rse.waste.point3")}</li>
              <li>{t("rse.waste.point4")}</li>
            </ul>
          </div>

          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/14/09/32/26/1000_F_1409322651_KETG9UN36kTObUNo3lXHtdFd3hSWYSKt.jpg"
              alt=""
              loading="lazy"
            />
            <h3>{t("rse.plastic.title")}</h3>
            <ul>
              <li>{t("rse.plastic.point1")}</li>
              <li>{t("rse.plastic.point2")}</li>
            </ul>
          </div>

          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://t4.ftcdn.net/jpg/14/61/49/55/240_F_1461495576_aQonkrkctxjWDXx7MPlDNje9iOLS5jpu.jpg"
              alt=""
              loading="lazy"
            />
            <h3>{t("rse.mobility.title")}</h3>
            <ul>
              <li>{t("rse.mobility.point1")}</li>
              <li>{t("rse.mobility.point2")}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.section3}>
        <div className={styles.section3content}>
          <h2>{t("rse.socialTitle")}</h2>
          <p>{t("rse.socialIntro")}</p>

          <div className={styles.section3grid}>
            <div className={styles.section3left}>
              <h3>{t("rse.wellbeing.title")}</h3>
              <ul>
                <li>{t("rse.wellbeing.point1")}</li>
                <li>{t("rse.wellbeing.point2")}</li>
                <li>{t("rse.wellbeing.point3")}</li>
              </ul>
            </div>

            <div className={styles.section3right}>
              <h3>{t("rse.inclusion.title")}</h3>
              <ul>
                <li>{t("rse.inclusion.point1")}</li>
                <li>{t("rse.inclusion.point2")}</li>
                <li>{t("rse.inclusion.point3")}</li>
                <li>{t("rse.inclusion.point4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section4}>
        <div data-aos="flip-left" className={styles.section4content}>
          <h2>{t("rse.commitmentTitle")}</h2>
          <p>{t("rse.commitmentText")}</p>
        </div>
      </div>
    </div>
  );
}
