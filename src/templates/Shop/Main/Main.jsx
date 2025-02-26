import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import Aos from "aos";
import "aos/dist/aos.css";
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import Head from "next/head";
import { useGetUser } from "@/Components/useGetUser";
import ShopHeroCarousel from "@/Components/ShopHeroCarousel/ShopHeroCarousel";
import Image from "next/image";

// Fonction de mélange Fisher-Yates pour un tri aléatoire performant
const shuffleArray = (array, limit) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, limit);
};

function Catalogue({ products }) {
  const [searchResults, setSearchResults] = useState([]);
  const user = useGetUser();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Filtrer les produits une seule fois avec useMemo
  const filteredProducts = useMemo(() => ({
    iPro: shuffleArray(
      products?.filter(
        (p) =>
          p.brand === "i-PRO" ||
          (p.brand === "Vivotek" && p.category === "Cameras")
      ),
      10
    ),
    // Zyxel: shuffleArray(products?.filter((p) => p.brand === "Zyxel"), 10),
    Milestone: shuffleArray(
      products?.filter((p) => p.brand === "Milestone Systems"),
      10
    ),
  }), [products]);

  return (
    <div className={styles["shop-container"]}>
      <Head>
        <title>Pixecurity Boutique : Vidéosurveillance et Sécurité</title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique : caméras de surveillance, équipements réseau, logiciels et plus."
        />
        <meta
          name="keywords"
          content="vidéosurveillance, sécurité, caméras, réseaux, stockage, analyse d'image, contrôle d'accès, logiciels, Paris, France"
        />
        <meta name="author" content="Pixecurity" />
      </Head>

      <ShopNav />
      <ShopSearch onSearchResults={handleSearchResults} />
      <ShopHeroCarousel />

      {searchResults.length > 0 ? (
        <div className={styles["search-results"]}></div>
      ) : (
        <>
          <div className={styles["products-carousel"]}>
            <h2>Explorez notre gamme complète de caméras</h2>
            <div className={styles.logos}>
              <Image
                src="/assets/partners/partnersLogo/vivotek.png"
                alt="Vivotek"
                loading="lazy"
                width={150}
                height={150}
              />
              <Image
                src="/assets/shop/shopLogos/i-pro.png"
                alt="i-Pro"
                loading="lazy"
                width={150}
                height={150}
              />
            </div>
            <ShopProductsCarousel carouselProducts={filteredProducts.iPro} />
          </div>

          <div className={styles["products-carousel"]}>
            <h2>Gestion vidéo avec Milestone</h2>
            <Image
              src="/assets/partners/partnersLogo/milestone.png"
              alt="Milestone"
              loading="lazy"
              width={150}
              height={150}
            />
            <ShopProductsCarousel carouselProducts={filteredProducts.Milestone} />
          </div>

          {/* <div className={styles["products-carousel"]}>
            <h2>Connectez-vous avec Zyxel</h2>
            <Image
              src="/assets/shop/shopLogos/zyxel.png"
              alt="Zyxel"
              loading="lazy"
              width={150}
              height={150}
            />
            <ShopProductsCarousel carouselProducts={filteredProducts.Zyxel} />
          </div> */}
        </>
      )}
    </div>
  );
}

export default Catalogue;
