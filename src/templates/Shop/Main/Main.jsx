import React, { useState, useMemo, useCallback, Suspense } from "react";
import styles from "./style.module.scss";
import { useGetUser } from "@/Components/useGetUser";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic imports pour réduire le JS initial
const ShopHeroCarousel = dynamic(() => import("@/Components/ShopHeroCarousel/ShopHeroCarousel"), {
  ssr: false,
});
const ShopProductsCarousel = dynamic(
  () => import("@/Components/ShopProductsCarousel/ShopProductsCarousel"),
  { ssr: false }
);
const ShopNav = dynamic(() => import("@/Components/ShopNav/ShopNav"), { ssr: false });
const ShopSearch = dynamic(() => import("@/Components/ShopSearch/ShopSearch"), { ssr: false });

// Shuffle côté client ou build-time
const shuffleArray = (array, limit) => {
  if (!array || array.length === 0) return [];
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, limit);
};

export default function Catalogue({ iProProducts, vmsProducts, divinitiProducts }) {
  const [searchResults, setSearchResults] = useState([]);
  const user = useGetUser();

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const shuffledIProProducts = useMemo(() => shuffleArray(iProProducts, 10), [iProProducts]);
  const shuffledVmsProducts = useMemo(() => shuffleArray(vmsProducts, 10), [vmsProducts]);
  const shuffledDivinitiProducts = useMemo(() => shuffleArray(divinitiProducts, 10), [divinitiProducts]);

  return (
    <div className={styles["shop-container"]}>
      <Head>
        <title>Pixecurity Boutique : Vidéosurveillance et Sécurité</title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique : caméras de surveillance, contrôle d'accès, équipements réseau, logiciels et plus."
        />
      </Head>

      <Suspense fallback={<div>Chargement du menu...</div>}>
        <ShopNav />
        <ShopSearch onSearchResults={handleSearchResults} />
        <ShopHeroCarousel />
      </Suspense>

      {searchResults.length > 0 ? (
        <div className={styles["search-results"]}></div>
      ) : (
        <>
          {/* I-Pro Products */}
          <div className={styles["products-carousel"]}>
            <h2>Explorez notre gamme complète de caméras</h2>
            <div className={styles.logos}>
              {[
                { src: "/assets/partners/partnersLogo/vivotek.png", alt: "Vivotek" },
                { src: "/assets/shop/shopLogos/bosch.png", alt: "Bosch" },
                { src: "/assets/shop/shopLogos/i-pro.png", alt: "i-Pro" },
              ].map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  width={150}
                  height={150}
                
                />
              ))}
            </div>
            <ShopProductsCarousel carouselProducts={shuffledIProProducts} />
          </div>

          {/* Diviniti Products */}
          <div className={styles["products-carousel"]}>
            <h2>Pilotez la sûreté de demain avec DIVINITI</h2>
            <div className={styles.logos}>
              <Image
                src="/assets/shop/shopLogos/diviniti-purple.png"
                alt="DIVINITI"
                loading="lazy"
                width={150}
                height={150}
            
              />
            </div>
            <ShopProductsCarousel carouselProducts={shuffledDivinitiProducts} />
          </div>

          {/* VMS Products */}
          <div className={styles["products-carousel"]}>
            <h2>Gestion vidéo avec Milestone & Genetec</h2>
            <div className={styles.logos}>
              {[
                { src: "/assets/partners/partnersLogo/milestone.png", alt: "Milestone" },
                { src: "/assets/partners/partnersLogo/genetec.png", alt: "Genetec" },
              ].map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ShopProductsCarousel carouselProducts={shuffledVmsProducts} />
          </div>
        </>
      )}
    </div>
  );
}
