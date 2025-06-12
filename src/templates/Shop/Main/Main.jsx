import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./style.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ShopHeroCarousel from "@/Components/ShopHeroCarousel/ShopHeroCarousel";
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import { useGetUser } from "@/Components/useGetUser";
import Head from "next/head";
import Image from "next/image";

const shuffleArray = (array, limit) => {
  if (!array || array.length === 0) return [];
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, limit);
};

function Catalogue({ iProProducts, vmsProducts, divinitiProducts }) {
  const [searchResults, setSearchResults] = useState([]);
  const user = useGetUser();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  // Mélange les produits avant affichage
  const shuffledIProProducts = useMemo(
    () => shuffleArray(iProProducts, 10),
    [iProProducts]
  );
  const shuffledVmsProducts = useMemo(
    () => shuffleArray(vmsProducts, 10),
    [vmsProducts]
  );
  // const shuffledZyxelProducts = useMemo(
  //   () => shuffleArray(zyxelProducts, 10),
  //   [zyxelProducts]
  // );
  const shuffledDivinitiProducts = useMemo(
    () => shuffleArray(divinitiProducts, 10),
    [divinitiProducts]
  );

  return (
    <div className={styles["shop-container"]}>
      <Head>
        <title>Pixecurity Boutique : Vidéosurveillance et Sécurité</title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique : caméras de surveillance, contrôle d'accès, équipements réseau, logiciels et plus."
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
                src="/assets/shop/shopLogos/bosch.png"
                alt="i-Pro"
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
            <ShopProductsCarousel carouselProducts={shuffledIProProducts} />
          </div>

          <div className={styles["products-carousel"]}>
            <h2> Pilotez la sûreté de demain avec DIVINITI</h2>
            <div className={styles.logos}>
              <Image
                src="/assets/shop/shopLogos/diviniti-purple.png"
                alt="Milestone"
                loading="lazy"
                width={150}
                height={150}
              />
            </div>
            <ShopProductsCarousel carouselProducts={shuffledDivinitiProducts} />
          </div>

          <div className={styles["products-carousel"]}>
            <h2>Gestion vidéo avec Milestone & Genetec</h2>
            <div className={styles.logos}>
              <Image
                src="/assets/partners/partnersLogo/milestone.png"
                alt="Milestone"
                loading="lazy"
                width={150}
                height={150}
              />
              <Image
                src="/assets/partners/partnersLogo/genetec.png"
                alt="Milestone"
                loading="lazy"
                width={150}
                height={150}
              />
            </div>
            <ShopProductsCarousel carouselProducts={shuffledVmsProducts} />
          </div>
        </>
      )}
    </div>
  );
}

export default Catalogue;
