import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import Aos from "aos";
import { logos } from "../../templates/Shop/Product/LogosData";
import { BASE_URL } from "../../url";
import { useGetUser } from "../useGetUser";
import useFavorites from "../useFavorites";
import useCart from "../useCart";
import useDiscount from "../useDiscount"; // Importer le hook useDiscount

const ProductCard = ({ product }) => {
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isInFavorites, setIsInFavorites] = useState(false);


    const user = useGetUser();
    const userId = user?._id;
    const { applyDiscountsForProductsDisplay } = useDiscount(userId);
  
    const discountedPrice = applyDiscountsForProductsDisplay(product);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId) {
        try {
          const isInFavs = await checkFavorite(userId, product._id);
          setIsInFavorites(isInFavs);
        } catch (error) {
          console.error("Error in fetchFavoriteStatus:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [userId, product._id, checkFavorite]);

  const handleToggleFavoritesClick = async () => {
    console.log("Trying to remove product with ID:", product._id);
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

  const handleAddToCartClick = async () => {
    if (userId) {
      const added = await addToCart(
        userId,
        product._id,
        product.name,
        product.ref,
        1,
        product.price,
        product.image
      );
      if (added) {
        console.log("Produit ajouté au panier avec succès!");
      } else {
        console.error("Erreur lors de l'ajout du produit au panier");
      }
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Pour ajouter un produit au panier, veuillez vous connecter ou vous inscrire.",
        showConfirmButton: true,
      });
    }
  };

  const calculateDiscountedPrice = () => {
    if ( product.price && discountedPrice !== product.price) {
      return (
        <div className={styles["card-prices"]}>
          <p className={styles["original-price"]}>
            {product.price.toFixed(2)} €{" "}
          </p>
          <p className={styles["discounted-price"]}>
            {discountedPrice.toFixed(2)} € <span>HT</span>{" "}
          </p>
        </div>
      );
    } else {
      return (
        <span className={styles["card-price"]}>
          {product.price ? product.price.toFixed(2) : "00.00"} €<span> HT</span>
        </span>
      );
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const brandLogo = logos.find(
    (logo) => logo.name.toLowerCase() === product.brand?.toLowerCase()
  );

  return (
    <div className={styles["product-card"]}>
      {discountedPrice !== product.price && (
        <span className={styles["discount-badge"]}>
          -{((1 - discountedPrice / product.price) * 100).toFixed(0)}%
        </span>
      )}
      {product.image.startsWith("http") ? (
        <img src={product.image} alt="" className={styles["product-img"]} />
      ) : (
        <img
          src={`${BASE_URL}${product.image}`}
          alt=""
          className={styles["product-img"]}
        />
      )}

      <div className={styles["card-title"]}>
        <Link href={`/boutique/produit/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
      </div>
      <div className={styles["card-brand"]}>
        {brandLogo && (
          <img
            src={brandLogo.logo}
            alt={brandLogo.name}
            className={styles["brand-logo"]}
          />
        )}
      </div>
      <div className={styles["card-bottom"]}>
        {calculateDiscountedPrice()}
        <div className={styles["CTA"]}>
          <p
            data-aos="zoom-in-down"
            className={styles["heart"]}
            onClick={handleToggleFavoritesClick}
            style={{ cursor: "pointer" }}
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: isInFavorites ? "#ed3f3f" : "#838485" }}
            ></i>
          </p>
          <p data-aos="zoom-in-down" className={styles["cart"]}>
            <i
              className="fa-solid fa-cart-plus"
              onClick={handleAddToCartClick}
              style={{ cursor: "pointer" }}
            ></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
