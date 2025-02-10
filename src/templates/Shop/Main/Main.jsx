import React, { useState, useEffect } from "react";
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

function Catalogue({ products }) {
  const [searchResults, setSearchResults] = useState([]);

  function getRandomProducts(products, limit) {
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, limit);
  }

  const filteredProducts1 = products?.filter(
    (product) => product.category === "Caméras"
  );
  const carouselProducts1 = getRandomProducts(filteredProducts1, 10);

  const filteredProducts3 = products?.filter(
    (product) => product.brand === "Milestone"
  );
  const carouselProducts3 = getRandomProducts(filteredProducts3, 10);

  const user = useGetUser();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

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

        <link
          rel="preload"
          href="/assets/shop/banners/banner1.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/shop/banners/banner2.png"
          as="image"
          type="image/png"
        />

        <link
          rel="preload"
          href="/assets/shop/banners/banner3.jpg"
          as="image"
          type="image/jpg"
        />

        <link
          rel="preload"
          href="/assets/shop/banners/banner4.jpg"
          as="image"
          type="image/jpg"
        />

        <link
          rel="preload"
          href="/assets/shop/cameras.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/shop/reseaux.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/shop/logiciels.webp"
          as="image"
          type="image/webp"
        />

        <link
          rel="preload"
          href="/assets/shop/autres.webp"
          as="image"
          type="image/webp"
        />
      </Head>

      <ShopNav />
      <ShopSearch onSearchResults={handleSearchResults} />
      <ShopHeroCarousel />

      {searchResults.length > 0 && (
        <div className={styles["search-results"]}></div>
      )}

      {searchResults.length === 0 && (
        <>
          <div data-aos="fade-up" className={styles["shop-categories"]}>
            <Link
              href={`/boutique/Caméras${user?._id ? `?userId=${user?._id}` : ""}`}
            >
              <div className={styles.category}>
                <h1>Caméras</h1>
                <Image
                  src="/assets/shop/cameras.webp"
                  alt="Caméras"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </div>
            </Link>

            <Link
              href={`/boutique/Réseau${user?._id ? `?userId=${user?._id}` : ""}`}
            >
              <div className={styles.category}>
                <h1>Réseaux</h1>
                <Image
                  src="/assets/shop/reseaux.webp"
                  alt="Réseaux"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </div>
            </Link>

            <Link
              href={`/boutique/Logiciels${user?._id ? `?userId=${user?._id}` : ""}`}
            >
              <div className={styles.category}>
                <h1>Logiciels</h1>
                <Image
                  src="/assets/shop/logiciels.webp"
                  alt="Logiciels"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </div>
            </Link>

            <Link
              href={`/boutique/Autres${user?._id ? `?userId=${user?._id}` : ""}`}
            >
              <div className={styles.category}>
                <h1>Autres</h1>
                <Image
                  src="/assets/shop/autres.webp"
                  alt="Autres"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          </div>

          <div className={styles["products-carousel"]}>
            <h2>
              Explorez notre gamme complète de caméras : Dômes, Bullet, Fisheye
              et plus
            </h2>
            <div className={styles.logos}>
              <Image
                src="/assets/partners/partnersLogo/vivotek.png"
                alt="Vivotek-logo"
                loading="lazy"
                width={150}
                height={150}
              />
              <Image
                src="/assets/shop/shopLogos/i-pro.png"
                alt="i-Pro-logo"
                loading="lazy"
                width={150}
                height={150}
              />
              <Image
                src="/assets/partners/partnersLogo/bosch.png"
                alt="Bosch-logo"
                loading="lazy"
                width={150}
                height={150}
              />
            </div>
            <ShopProductsCarousel carouselProducts={carouselProducts1} />
          </div>

          <div className={styles["products-carousel"]}>
            <h2>
              Maîtrisez la gestion vidéo avec Milestone : Notre expertise au
              service de vos besoins
            </h2>
            <Image
              src="/assets/partners/partnersLogo/milestone.png"
              alt="Milestone-logo"
              loading="lazy"
              width={150}
              height={150}
            />
            <ShopProductsCarousel carouselProducts={carouselProducts3} />
          </div>
        </>
      )}
    </div>
  );
}

export default Catalogue;
