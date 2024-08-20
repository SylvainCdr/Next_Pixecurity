import React, { useState, useEffect, useMemo, useCallback } from "react";
import useFavorites from "@/Components/useFavorites";
import { useCartContext } from "@/Components/cartContext";
import Swal from "sweetalert2";
import AOS from "aos";
import { logos } from "@/templates/Shop/Product/LogosData";
import { BASE_URL } from "@/url";
import { useGetUser } from "@/Components/useGetUser";
import styles from "./style.module.scss";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Head from "next/head";
import Link from "next/link";
import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";

const Product = ({ product, id, suggestions }) => {
  const { addToFavorites, removeFromFavorites, checkFavorite, getFavorites } =
    useFavorites();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const user = useGetUser();
  const userId = user?._id;

  const brandLogo = useMemo(
    () => logos.find((logo) => logo.name.toLowerCase() === product.brand?.toLowerCase()),
    [product.brand]
  );

  const labelsMapping = useMemo(
    () => ({
      dimensions: "Dimensions",
      poids: "Poids",
      temp: "Température de fonctionnement",
      megapixels: "Mégapixels",
      distanceFocale: "Distance focale",
      ouverture: "Ouverture",
      angleVue: "Angle de vue",
      imgSec: "Images par seconde",
      capteur: "Capteur",
      resolution: "Résolution",
      couleur: "Couleur",
      infrarouge: "Infrarouge",
      distanceInfrarouge: "Distance infrarouge",
      indiceProtection: "Indice de protection",
      puissance: "Puissance",
      installationExt: "Installation extérieure",
      nbrePorts: "Nombre de ports",
      rackable: "Rackable",
      manageable: "Manageable",
      poe: "PoE",
      poePlus: "PoE+",
      poePlusPlus: "PoE++",
      consommation: "Consommation max",
      garantie: "Garantie",
      interface: "Interface",
      usb: "USB",
      portConsole: "Port console",
      debitVpn: "Débit VPN",
      maxTcp: "Max TCP",
      debitFirewall: "Débit Firewall",
      vitesse: "Vitesse",
      typeWifi: "Type de WiFi",
      antenne: "Antenne",
      lan: "LAN",
      nebula: "Nebula",
    }),
    []
  );

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId && id) {
        try {
          const isInFavs = await checkFavorite(userId, id);
          setIsInFavorites(isInFavs);
        } catch (error) {
          console.error("Error in fetchFavoriteStatus:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [userId, id, checkFavorite]);

  const handleToggleFavoritesClick = useCallback(async () => {
    if (userId) {
      try {
        if (isInFavorites) {
          await removeFromFavorites(userId, id);
        } else {
          await addToFavorites(userId, id, product.name, product.price, product.ref, product.image);
        }
        setIsInFavorites(!isInFavorites);
      } catch (error) {
        console.error("Error toggling favorites:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Pour ajouter un produit à vos favoris, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  }, [userId, id, isInFavorites, addToFavorites, removeFromFavorites, product]);

  const handleAddToCartClick = useCallback(async () => {
    if (userId) {
      try {
        await addToCart(product, quantity);
        Swal.fire({
          icon: "success",
          title: "Produit ajouté au panier avec succès!",
          showConfirmButton: false,
          timer: 1200,
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Pour ajouter un produit au panier, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  }, [userId, product, quantity, addToCart]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "id": product.ref,
    "name": product.name,
    "title": product.name,
    "description": product.description,
    "image_link": product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.price,
      "priceValidUntil": "2024-12-31",
      "itemCondition": "NewCondition",
      "availability": "InStock",
    },
    "mpn": product.ref,
    "link": `${BASE_URL}/shop/${product._id}`,
  };
  

  return (
    <div className={styles["product-container"]}>
      <Head>
        <title>{product.name} - Pixecurity</title>
        <meta name="description" content={product.description} />
        <meta
          name="keywords"
          content="caméra, caméras, surveillance, sécurité, sûreté, vidéo, protection videoprotection, videosurveillance, analyse d'image, intelligente, IA, IP, HD, 4K, bosch, vivotek, i-pro, zyxel, vms, milestone, til techonologies, i-pro, zyxel, cisco, comnet, vuwall, briefcam, technoaware, ptz, bullet, dôme, multicapteur, switch, firewall, licence, license"
        />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <RegisterPopup />
      <ShopNav />
      <ShopSearch />

      <div className={styles["product-page"]}>
        <div className={styles["product-section1"]}>
          <div data-aos="zoom-in-right" className={styles["product-img"]}>
            {product.pourcentageDiscount !== 0 && (
              <p className={styles["discount-badge"]}>
                -{product.pourcentageDiscount}%
              </p>
            )}

            <img
              src={
                product.image && product.image.startsWith("http")
                  ? product.image
                  : `${BASE_URL}${product.image}`
              }
              alt={product.name}
              loading="lazy"
            />
            <p
              className={styles.like}
              data-aos="zoom-in-left"
              onClick={handleToggleFavoritesClick}
              style={{ cursor: "pointer" }}
              aria-label={`Add ${product.name} to favorites`}
              role="button"
            >
              <i
                className="fa-solid fa-heart"
                style={{ color: isInFavorites ? "#ed3f3f" : "inherit" }}
              ></i>
            </p>
          </div>
          <div className={styles["product-description"]}>
            <h1>{product.name}</h1>

            {brandLogo ? (
              <img
                src={brandLogo.logo}
                alt={product.brand}
                className={styles["brand-logo"]}
                loading="lazy"
              />
            ) : (
              <p className={styles["brand-logo"]}>{product.brand}</p>
            )}

            <p className={styles.presentation}>{product.presentation}</p>

            {product.category === "Logiciels" ? (
              <p className={styles.stock}>
                <i className="fa-solid fa-check"></i> En stock
              </p>
            ) : (
              <p className={styles.stock}>
                <i className="fa-solid fa-check"></i> Disponible sur commande
              </p>
            )}

            <div className={styles.details}>
              <p className={styles.securePayment}>
                <i className="fa-solid fa-lock"></i> Paiement sécurisé
              </p>
              {product.category === "Logiciels" ? (
                <p>
                  <i className="fa-solid fa-envelope"></i> Activation sous 48 à
                  72 heures
                </p>
              ) : (
                <p>
                  <i className="fa-solid fa-truck-fast"></i> Livraison sous 2 à
                  3 semaines via DHL
                </p>
              )}
              {product.category !== "Logiciels" && (
                <img
                  src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg"
                  alt="DHL-logo"
                />
              )}
            </div>

            <div className={styles["price-addToCart"]}>
              <div className={styles.price}>
                <DiscountedPrice product={product} />
              </div>
              <div className={styles.quantity}>
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className={styles["qty-input"]}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className={styles["qty-input"]}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button onClick={handleAddToCartClick} aria-label="Add to cart">
                Ajouter au panier
              </button>
            </div>
            <p className={styles.ref}>Référence : {product.ref}</p>
          </div>
        </div>

        <div className={styles["product-section2"]}>
          <ProductDetails product={product} labelsMapping={labelsMapping} />

          <div className={styles["product-suggestions"]}>
            <h3>Produits similaires</h3>
            <div className={styles["suggestions-grid"]}>
              {suggestions.map((item) => (
                <ProductCard
                  key={item._id}
                  product={item}
                  isInFavorites={isInFavorites}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  checkFavorite={checkFavorite}
                  getFavorites={getFavorites}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DiscountedPrice = ({ product }) => {
  const discountPrice = useMemo(
    () => product.price * (1 - product.pourcentageDiscount / 100),
    [product.price, product.pourcentageDiscount]
  );

  return (
    <p className={styles.prices}>
      <span className={styles["original-price"]}>
        {product.price.toFixed(2)} €
      </span>
      <span className={styles["discounted-price"]}>
        {discountPrice.toFixed(2)} € <span>HT</span>
      </span>
    </p>
  );
};

const ProductDetails = ({ product, labelsMapping }) => (
  <div className={styles["product-details"]}>
    <h3>Détails du produit</h3>
    <p>{product.description}</p>
    <table>
      <tbody>
        {product.details &&
          Object.keys(product.details).map(
            (key) =>
              product.details[key] !== "" && (
                <tr key={key}>
                  <td>{labelsMapping[key] || key}</td>
                  <td>{product.details[key]}</td>
                </tr>
              )
          )}
      </tbody>
    </table>

    {product.pdf && (
      <Link
        href={product.pdf}
        download={product.category !== "Logiciels"}
        target="_blank"
        className={styles["pdf-link"]}
      >
        {product.category === "Logiciels"
          ? "En savoir plus"
          : "Fiche technique"}{" "}
        <i
          className={
            product.category === "Logiciels"
              ? "fa-solid fa-arrow-up-right-from-square"
              : "fa-solid fa-file-pdf"
          }
        ></i>
      </Link>
    )}
  </div>
);

export default Product;
