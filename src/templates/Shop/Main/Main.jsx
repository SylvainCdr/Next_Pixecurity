import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import Aos from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import Head from "next/head";

function Catalogue({ products }) {
  const carouselProducts = products?.filter(
    (product) => product.brand === "Vivotek"
  );

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={styles["shop-container"]}>
      <Head>
        <title>
          Pixecurity Boutique : Vidéosurveillance, analyse d'image, contrôle
          d'accès, réseaux/stockage des données, hypervision...{" "}
        </title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique. Nous offrons des caméras de surveillance, des équipements réseau, des logiciels et plus encore pour répondre à vos besoins en sécurité."
        />
        <meta
          name="keywords"
          content="catalogue, boutique, produits, caméras, surveillance, videosurveillance, sûreté, sécurité, Paris, France, videoprotection, équipements réseau, logiciels, sécurité, Vivotek, Bosch, Zyxel, I-Pro, Milestone, Til Technologies, Cisco, Comnet, Vuwall, Briefcam, Technoaware, bullet, ptz, dôme, angle, fisheye, multicapteur, fixe, switch, firewall"
        />
        <meta name="author" content="Pixecurity" />
      </Head>

      <ShopNav />
      <ShopSearch />

      <div data-aos="fade-up" className={styles["shop-categories"]}>
        <Link href="/boutique/Caméras">
          <div className={styles.category}>
            <h1>Caméras</h1>
            <img
              src="assets/cameras.webp"
              alt="Caméras"
              loading="lazy"
            />
          </div>
        </Link>

        <Link href="/boutique/Réseau">
          <div className={styles.category}>
            <h1>Réseaux</h1>
            <img
              src="assets/reseaux.webp"
              alt="Réseaux"
              loading="lazy"
            />
          </div>
        </Link>

        <Link href="/boutique/Logiciels">
          <div className={styles.category}>
            <h1>Logiciels</h1>
            <img
              src="assets/logiciels.webp"
              alt="Logiciels"
              loading="lazy"
            />
          </div>
        </Link>

        <Link href="/boutique/Autres">
          <div className={styles.category}>
            <h1>Autres</h1>
            <img
              src="assets/autres.webp"
              alt="Autres"
              loading="lazy"
            />
          </div>
        </Link>
      </div>

      <div className={styles["products-carousel"]}>
        <h2>Découvrez nos produits Vivotek </h2>
        <ShopProductsCarousel carouselProducts={carouselProducts} />
      </div>
    </div>
  );
}

export default Catalogue;
