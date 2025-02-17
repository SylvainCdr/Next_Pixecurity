import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import Aos from "aos";
import { logos } from "../../templates/Shop/Product/LogosData";
import { BASE_URL } from "../../url";
import { useGetUser } from "../useGetUser";
import useFavorites from "../useFavorites";
import { useCartContext } from "@/Components/cartContext";
import Head from "next/head";
import Image from "next/image";
import aos from "aos";

function ProductCard({ product }) {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const brandLogo = logos.find(
    (logo) => logo.name.toLowerCase() === product.brand?.toLowerCase()
  );

  const user = useGetUser();
  const userId = user?._id;

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div className={styles["product-card"]} data-aos="zoom-in">
      <Head>
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        {/* Add more OG meta tags as needed */}
      </Head>
      <Link
        href={`/boutique/produit/${product._id}${userId ? `?userId=${userId}` : ""}`}
        style={{ textDecoration: "none" }}
      >
        <DiscountBadge product={product} />
        <div className={styles.imgContainer}>
          {product && product.image ? (
            product.image.startsWith("http") ? (
              <img
                src={product.image}
                alt={product.name}
                className={styles["product-img"]}
                loading="lazy"
              />
            ) : (
              <Image
                src={`${BASE_URL}${product.image}`}
                alt={product.name}
                className={styles["product-img"]}
                width={150}
                height={150}
                loading="lazy"
              />
            )
          ) : (
            <img
              src="/assets/shop/nopicavailable.webp"
              alt={product.name}
              className={styles["product-img"]}
            />
          )}
        </div>

        <h1 className={styles["card-title"]}>{product.name}</h1>
        <div className={styles["card-brand"]}>
          {brandLogo && (
            <img
              src={brandLogo.logo}
              alt={brandLogo.name}
              className={styles["brand-logo"]}
              loading="lazy"
            />
          )}
        </div>
      </Link>
      <div className={styles["card-bottom"]}>
        <Prices product={product} />
        <div className={styles.CTA}>
          <ButtonAddToFavorite product={product} />
          <ButtonAddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

function DiscountBadge({ product }) {
  if (!product?.pourcentageDiscount) return null;

  return (
    <p className={styles["discount-badge"]} data-aos="zoom-in-up">
      -{product.pourcentageDiscount}%
    </p>
  );
}

function Prices({ product }) {
  if (
    product.price &&
    product.discountPrice &&
    product.price !== product.discountPrice
  ) {
    return (
      <div className={styles["card-prices"]}>
        <p className={styles["original-price"]}>
          {product.price.toFixed(2)} €{" "}
        </p>
        <p className={styles["discounted-price"]}>
          {product.discountPrice.toFixed(2)} € <span>HT</span>{" "}
        </p>
      </div>
    );
  }

  return (
    <p className={styles["card-price"]}>
      {product.price ? product.price.toFixed(2) : "00.00"} €<span> HT</span>
    </p>
  );
}

function ButtonAddToFavorite({ product }) {
  const prouductId = product._id;
  const user = useGetUser();
  const userId = user?._id;

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();

  const [isInFavorites, setIsInFavorites] = useState(false);
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!userId) return;

      try {
        const isInFavs = await checkFavorite(userId, prouductId);
        setIsInFavorites(isInFavs);
      } catch (error) {
        console.error("Error in fetchFavoriteStatus:", error);
      }
    };

    fetchFavoriteStatus();
  }, [userId, prouductId, checkFavorite]);

  const handleToggleFavorites = async () => {
    try {
      if (userId) {
        if (isInFavorites) {
          await removeFromFavorites(userId, product._id);
        } else {
          await addToFavorites(
            userId,
            product._id,
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
    } catch (error) {
      console.error("Erreur lors de la gestion des favoris :", error);
    }
  };

  return (
    <button className={styles.heart} onClick={handleToggleFavorites}>
      <i
        className="fa-solid fa-heart"
        style={{ color: isInFavorites ? "#ed3f3f" : "#838485" }}
        data-aos="zoom-in"
      />
    </button>
  );
}

// Fonction pour ajouter un produit au panier, si le user est connecté sinon afficher un message d'erreur
// function ButtonAddToCart({ product }) {
//   const { addToCart } = useCartContext();
//   const user = useGetUser();
//   const userId = user?._id;

//   const handleAddToCart = async () => {
//     if (userId) {
//       await addToCart(product);
//       Swal.fire({
//         icon: "success",
//         title: "Produit ajouté au panier avec succès!",
//         showConfirmButton: false,
//         timer: 1200,
//       });
//     } else {
//       Swal.fire({
//         icon: "info",
//         title:
//           "Pour ajouter un produit au panier, veuillez vous connecter ou vous inscrire.",
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <button className={styles.cart} onClick={handleAddToCart}>
//       <i className="fa-solid fa-cart-plus" data-aos="zoom-in" />
//     </button>
//   );
// }

// Fonction modifié pour permettre l'ajout d'un produit au panier à tous les users connectés ou non
function ButtonAddToCart({ product }) {
  const { addToCart } = useCartContext();
  // const user = useGetUser();
  // const userId = user?._id;

  const handleAddToCart = async () => {
    await addToCart(product);
    Swal.fire({
      icon: "success",
      title: "Produit ajouté au panier avec succès!",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <button className={styles.cart} onClick={handleAddToCart}>
      <i className="fa-solid fa-cart-plus" data-aos="zoom-in" />
    </button>
  );
}

export default ProductCard;
