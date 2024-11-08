import styles from "./style.module.scss";
import { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";

export default function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>À propos - Pixecurity</title>
        <meta
          name="description"
          content="Découvrez Pixecurity, des ingénieurs 3.0 spécialisés en sécurité, génie civil, électronique appliquée et IT, prêts à fournir des solutions de sûreté adaptées à vos besoins."
        />
        <meta
          name="keywords"
          content="sécurité, solutions de sûreté, protection, surveillance, Pixecurity, france, paris, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
        <meta name="author" content="Pixecurity" />
        {/* Autres balises meta spécifiques à cette page si nécessaire */}
      </Head>

      <div className={styles["aboutUs-container"]}>
        <div className={styles["section-1"]}>
          <h1>{t("aboutUs.title")}</h1>
          <p>{t("aboutUs.section1.text")}</p>
          <Link href="/contact">
            <button>{t("aboutUs.section1.button")}</button>
          </Link>
        </div>

        <div className={styles["section-2"]}>
          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className={styles.top}>
              <Image
                src={t("aboutUs.section2.cards.imgSrc1")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title1")}</h2>
            <p>{t("aboutUs.section2.cards.text1")}</p>
          </div>

          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className={styles.top}>
              <Image
                src={t("aboutUs.section2.cards.imgSrc2")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title2")}</h2>
            <p>{t("aboutUs.section2.cards.text2")}</p>
          </div>

          <div
            className={styles["card-about"]}
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            <div className={styles.top}>
              <Image
                src={t("aboutUs.section2.cards.imgSrc3")}
                alt=""
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <h2>{t("aboutUs.section2.cards.title3")}</h2>
            <p>{t("aboutUs.section2.cards.text3")}</p>
          </div>
        </div>

        <div className={styles["section-3"]}>
          <h3
            dangerouslySetInnerHTML={{ __html: t("aboutUs.section3.quote") }}
          />
          <div className={styles.bottom}>
            <p>{t("aboutUs.section3.author")}</p>
            <Image
              src={t("aboutUs.section3.imgSrc")}
              alt=""
              loading="lazy"
              width={400}
              height={400}
            />
          </div>
        </div>

        <div className={styles["section-4"]}>
          <h1>{t("aboutUs.section4.title")}</h1>
          <h2>{t("aboutUs.section4.subtitle")}</h2>
          <ul className={styles["auto-grid"]} role="list">
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Kenza GAUTIAM</h2>
                <p>Commerciale</p>
                <Image
                  alt="Kenza GAUTIAM"
                  src="/assets/team/KENZA.jpeg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Fabien THOMAS</h2>
                <p>Brand Manager</p>
                <Image
                  alt="Fabien THOMAS"
                  src="/assets/team/FABIEN.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Anaelle Souhaut</h2>
                <p>Chargée d'Affaires</p>
                <Image
                  alt="Fabien THOMAS"
                  src="/assets/team/ANAELLE.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Fabrice VALLEE</h2>
                <p>Commercial Grands Comptes</p>
                <Image
                  alt="Fabrice VALLEE"
                  src="/assets/team/FABRICE.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Yanis MEBARKI</h2>
                <p>Commercial</p>
                <Image
                  alt="Yanis MEBARKI"
                  src="/assets/team/YANNIS.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>

            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Dyhia LAGA</h2>
                <p>Chargée d'Etude Avant-Vente</p>
                <Image
                  alt="Dyhia LAGA"
                  src="/assets/team/DYHIA.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Jessica FILIALI</h2>
                <p>Assistante de Direction</p>
                <Image
                  alt="Jessica FILIALI"
                  src="/assets/team/JESSICA.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Abdulrhaman SHOUGRI</h2>
                <p>Commercial</p>
                <Image
                  alt="Abdulrhaman SHOUGRI"
                  src="/assets/team/ABDULRAHMAN.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>

            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Adrien JOANNY</h2>
                <p>Ingénieur Systèmes & Réseaux</p>
                <Image
                  alt="Adrien JOANNY"
                  src="/assets/team/ADRIEN_J.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Meriem BOUSSAHA</h2>
                <p>Développeuse</p>
                <Image
                  alt="Anaelle SOUHAUT"
                  src="/assets/team/MIRIEM.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Alexis OTTINA</h2>
                <p>Développeur</p>
                <Image
                  alt="Alexis OTTINA"
                  src="/assets/team/ALEXIS.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Abdelhadi LAMMINI</h2>
                <p>Product Owner</p>
                <Image
                  alt="Abdelhadi LAMMINI"
                  src="/assets/team/ABDELHADI_.webp"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Nathalie JANNOT</h2>
                <p>Assistante de Direction</p>
                <Image
                  alt="Nathalie JANNOT"
                  src="/assets/team/NATHALIE.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Augustin MAHIEU</h2>
                <p>Développeur</p>
                <Image
                  alt="Augustin MAHIEU"
                  src="/assets/team/AUGUSTIN.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Yasmina AOUAM</h2>
                <p>Chargée d'Etude Avant-Vente</p>
                <Image
                  alt="Yasmina AOUAM"
                  src="/assets/team/YASMINA.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Alex HUBERT</h2>
                <p>Développeur</p>
                <Image
                  alt="Alex HUBERT"
                  src="/assets/team/ALEX.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Aziz ARJDAL</h2>
                <p>Technicien Systèmes & Réseaux</p>
                <Image
                  alt="Aziz ARJDAL"
                  src="/assets/team/AZIZ.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Sylvain CADORET</h2>
                <p>Développeur</p>
                <Image
                  alt="Sylvain CADORET"
                  src="/assets/team/SYLVAIN.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Michael GONFIER</h2>
                <p>Technicien Systèmes & Réseaux</p>
                <Image
                  alt="Michael GONFIER"
                  src="/assets/team/MICHAEL_.webp"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Amélie CORDIER</h2>
                <p>UX/UI Designer</p>
                <Image
                  alt="Amélie CORDIER"
                  src="/assets/team/AMELIE_.webp"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Mathieu PACREAU</h2>
                <p>Technicien supérieur Systèmes & Réseaux</p>
                <Image
                  alt="Mathieu PACREAU"
                  src="/assets/team/MATHIEU_P.jpg"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Adrien DESDOITS</h2>
                <p>Technicien Systèmes & Réseaux</p>
                <Image
                  alt="Adrien DESDOITS"
                  src="/assets/team/ADRIEN_D.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Morgane PEREIRA</h2>
                <p>Assistante Administrative</p>
                <Image
                  alt="Morgane PEREIRA"
                  src="/assets/team/MORGANE_.webp"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>David LEPAGE</h2>
                <p>Chargé d'Affaires des Projets Transports</p>
                <Image
                  alt="David LEPAGE"
                  src="/assets/team/DAVID.jpg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>

            <li>
              <div className={styles.profile}>
                <h2 className={styles["profile__name"]}>Andy BARZOLA</h2>
                <p>3D Designer</p>
                <Image
                  alt="Andy BARZOLA"
                  src="/assets/team/ANDY.webp"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
