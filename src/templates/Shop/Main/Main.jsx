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

  function getRandomProducts(products, limit) {
    // Mélanger le tableau des produits
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    // Limiter le nombre de produits à 'limit'
    return shuffledProducts.slice(0, limit);
  }

  const filteredProducts1 = products?.filter(
    (product) => product.brand === "Vivotek"
  );
  const carouselProducts1 = getRandomProducts(filteredProducts1, 10);

  const filteredProducts2 = products?.filter(
    (product) => product.brand === "Zyxel"
  );
  const carouselProducts2 = getRandomProducts(filteredProducts2, 10);

  const filteredProducts3 = products?.filter(
    (product) => product.brand === "Milestone"
  );
  const carouselProducts3 = getRandomProducts(filteredProducts3, 10);




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
            <img src="assets/cameras.webp" alt="Caméras" loading="lazy" />
          </div>
        </Link>

        <Link href="/boutique/Réseau">
          <div className={styles.category}>
            <h1>Réseaux</h1>
            <img src="assets/reseaux.webp" alt="Réseaux" loading="lazy" />
          </div>
        </Link>

        <Link href="/boutique/Logiciels">
          <div className={styles.category}>
            <h1>Logiciels</h1>
            <img src="assets/logiciels.webp" alt="Logiciels" loading="lazy" />
          </div>
        </Link>

        <Link href="/boutique/Autres">
          <div className={styles.category}>
            <h1>Autres</h1>
            <img src="assets/autres.webp" alt="Autres" loading="lazy" />
          </div>
        </Link>
      </div>

      <div className={styles["products-carousel"]}>
        {/* <h2>Découvrez nos produits Vivotek </h2> */}
        <img
          src="assets/partnersLogo/vivotek.png"
          alt="Vivotek-logo"
          loading="lazy"
        />
        <ShopProductsCarousel carouselProducts={carouselProducts1} />
      </div>
      <div className={styles["products-carousel"]}>
        {/* <h2>Découvrez nos produits Vivotek </h2> */}
        <img
          src="assets/partnersLogo/zyxel2.png"
          alt="Zyxel-logo"
          loading="lazy"
        />
        <ShopProductsCarousel carouselProducts={carouselProducts2} />
      </div>
      <div className={styles["products-carousel"]}>
        {/* <h2>Découvrez nos produits Vivotek </h2> */}
        <img
          src="assets/partnersLogo/milestone.png"
          alt="Milestone-logo"
          loading="lazy"
        />
        <ShopProductsCarousel carouselProducts={carouselProducts3} />
      </div>
    </div>
  );
}

export default Catalogue;
