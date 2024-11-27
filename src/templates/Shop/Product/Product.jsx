import React, { useState, useEffect } from "react";
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

export default function Product({ product, id, suggestions }) {
  const { addToFavorites, removeFromFavorites, checkFavorite, getFavorites } =
    useFavorites();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const user = useGetUser();
  const userId = user?._id;

  const brandLogo = logos.find(
    (logo) => logo.name.toLowerCase() === product.brand?.toLowerCase()
  );

  const [searchResults, setSearchResults] = useState([]);

  const labelsMapping = {
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
  };

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

  const handleToggleFavoritesClick = async () => {
    if (userId) {
      if (isInFavorites) {
        await removeFromFavorites(userId, id);
      } else {
        await addToFavorites(
          userId,
          id,
          product.name,
          product.price,
          product.ref,
          product.image
        );
      }

      setIsInFavorites(!isInFavorites);
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit à vos favoris, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  const handleAddToCartClick = async () => {
    if (userId) {
      await addToCart(product, quantity);
      Swal.fire({
        icon: "success",
        title: "Produit ajouté au panier avec succès!",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit au panier, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    const jsonLdData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      description: product.presentation,
      image: product.image.startsWith("http")
        ? product.image
        : `${BASE_URL}${product.image}`,
      url: `https://pixecurity.com/boutique/produit/${product._id}`,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: product.price.toFixed(2),
        priceValidUntil: "2024-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
      },
      mpn: product.ref,
    };

    console.log("JSON-LD Data:", jsonLdData);

    try {
      const jsonString = JSON.stringify(jsonLdData);
      console.log("JSON-LD String:", jsonString);
    } catch (error) {
      console.error("Error stringifying JSON-LD data:", error);
    }
  }, [product]);

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.image.startsWith("http")
                ? product.image
                : `${BASE_URL}${product.image}`,
              url: `https://pixecurity.com/boutique/produit/${product._id}`,
              brand: {
                "@type": "Brand",
                name: product.brand,
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                price: product.price.toFixed(2),
                priceValidUntil: "2024-12-31",
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
              },
              mpn: product.ref,
            }),
          }}
        />
      </Head>

      <RegisterPopup />
      <ShopNav />
      <ShopSearch onSearchResults={handleSearchResults} />
      {searchResults.length === 0 && (
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

              <p className={styles.inquiry}>
                <i className="fa-solid fa-info-circle"></i> Pour vos besoins spécifiques, vos commandes en quantité ou vos devis groupés, {" "} 
                <Link href="/contact" className={styles.contactLink}>
                  contactez-nous
                </Link>
                . 
              </p>

              <div className={styles.details}>
                <p className={styles.securePayment}>
                  <i className="fa-solid fa-lock"></i> Paiement sécurisé
                </p>
                {product.category === "Logiciels" ? (
                  <p>
                    <i className="fa-solid fa-envelope"></i> Activation sous 48
                    à 72 heures
                  </p>
                ) : (
                  <p>
                    <i className="fa-solid fa-truck-fast"></i> Livraison sous 2
                    à 3 semaines via DHL
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
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                    className={styles["qty-input"]}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={styles["qty-input"]}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCartClick}>
                  Ajouter au panier
                </button>
              </div>
              <p className={styles.ref}>Référence : {product.ref}</p>
            </div>
          </div>

          <div className={styles["product-section2"]}>
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

              {product.pdf &&
                (product.category === "Logiciels" ? (
                  <Link
                    href={product.pdf}
                    target="_blank"
                    className={styles["pdf-link"]}
                  >
                    En savoir plus{" "}
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </Link>
                ) : (
                  <Link
                    href={product.pdf}
                    download
                    target="_blank"
                    className={styles["pdf-link"]}
                  >
                    Fiche technique <i className="fa-solid fa-file-pdf"></i>
                  </Link>
                ))}
            </div>

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
      )}
    </div>
  );
}

const DiscountedPrice = ({ product }) => {
  if (product.price && product.pourcentageDiscount) {
    const discountPrice =
      product.price * (1 - product.pourcentageDiscount / 100);
    return (
      <p className={styles.prices}>
        <span className={styles["original-price"]}>
          {product.price.toFixed(2)} €
        </span> <br />
        <span className={styles["discounted-price"]}>
          {discountPrice.toFixed(2)} € <span>HT</span>
        </span>
      </p>
    );
  }

  return (
    <p className={styles.price}>
      {product.price ? product.price.toFixed(2) : "00.00"} €<span>{" "}HT</span>
    </p>
  );
};
