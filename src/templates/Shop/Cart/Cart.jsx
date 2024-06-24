import React, { useState, useEffect } from "react";
import styles from "./style.module.scss"; // Import des styles CSS Modules
import useCart from "@/Components/useCart";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";

export default function Cart({ carouselProducts }) {
  const router = useRouter();
  const { fetchCart, editQuantity, removeFromCart, cart } = useCart();
  const user = useGetUser();
  const userId = user?._id; // Assurez-vous d'utiliser _id car c'est probablement la clé correcte.

  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect pour récupérer le panier de l'utilisateur grâce à son ID stocké dans le localStorage
  useEffect(() => {
    if (userId) fetchCart(userId);
  }, [userId]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/discounts`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des remises");
        }
        const data = await response.json();
        setDiscounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const applyDiscounts = (product) => {
    if (loading || error) {
      return product.price;
    }

    let finalPrice = product.price;
    let highestDiscount = 0;
    let highestDiscountType = null;

    discounts.forEach((discount) => {
      const isDateValid =
        new Date(discount.startDate) <= new Date() &&
        new Date(discount.endDate) >= new Date();
      const isGlobalAndUserTargeted =
        discount.isGlobalDiscount &&
        (discount.targetedUsers.length === 0 ||
          discount.targetedUsers.includes(userId));
      const isUserTargeted =
          
        discount.targetedUsers.length === 0 ||
        discount.targetedUsers.includes(userId);
      const isProductTargeted = discount.products.includes(product.product_id);
      const isBrandTargeted = discount.targetedBrands.includes(product.brand);

      if (
        isDateValid &&
        (isGlobalAndUserTargeted ||
          (isUserTargeted && (isProductTargeted || isBrandTargeted)))
      ) {
        if (discount.discountType === "percentage") {
          if (discount.discountValue > highestDiscount && highestDiscountType !== "fixed") {
            highestDiscount = discount.discountValue;
            highestDiscountType = "percentage";
          }
        } else if (discount.discountType === "fixed") {
          const fixedDiscountValue = (discount.discountValue / product.price) * 100;
          if (fixedDiscountValue > highestDiscount) {
            highestDiscount = fixedDiscountValue;
            highestDiscountType = "fixed";
          }
        }
      }
    });

    if (highestDiscountType === "percentage") {
      finalPrice -= (finalPrice * highestDiscount) / 100;
    } else if (highestDiscountType === "fixed") {
      finalPrice -= highestDiscount;
    }

    return finalPrice;
  };

  const calculatedSubTotal = cart?.reduce((acc, product) => {
    const discountedPrice = applyDiscounts(product);
    return acc + product.quantity * discountedPrice;
  }, 0) ?? 0;

  const tax = calculatedSubTotal * 0.2;
  const shippingCost = 20;
  const totalAmount = calculatedSubTotal + tax + shippingCost;

  const handleOrder = () => {
    router.push("/commande");
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleQuantityChange = (product, newValue) => {
    if (userId && newValue >= 1) {
      editQuantity(userId, product.product_id, newValue);
    } else {
      console.error("User ID is missing or invalid quantity");
    }
  };

  const handleRemoveFromCart = (product) => {
    if (userId) {
      removeFromCart(userId, product.product_id);
    } else {
      console.error("User ID is missing");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className={styles["cart-container"]}>
        <h1>Panier</h1>
        <div className={styles["empty-cart-message"]}>
          <p>Vous n'avez pas encore de produits dans votre panier.</p>
          <Link href="/boutique">
            <button>Visiter la boutique</button>
          </Link>
          <ShopProductsCarousel carouselProducts={carouselProducts} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-content"]}>
        <h1>Panier</h1>
        <div className={styles["shopping-cart"]}>
          <div className={styles["column-labels"]}>
            <label className={styles["product-image"]}>Image</label>
            <label className={styles["product-details"]}>Produit</label>
            <label className={styles["product-price"]}>Prix HT</label>
            <label className={styles["product-quantity"]}>Quantité</label>
            <label className={styles["product-removal"]}>Supprimer</label>
            <label className={styles["product-line-price"]}>Total HT</label>
          </div>

          {cart?.map((product, index) => {
            const discountedPrice = applyDiscounts(product);
            return (
              <div className={styles["product"]} key={index}>
                <div className={styles["product-image"]}>
                  <img
                    src={
                      product.image && product.image.startsWith("http")
                        ? product.image
                        : `${BASE_URL}${product.image}`
                    }
                    alt={product.name}
                  />
                </div>
                <div className={styles["product-details"]}>
                  <div className={styles["product-title"]}>
                    {product.name}
                    <p>Réf : {product.ref}</p>
                  </div>
                  <p className={styles["product-description"]}>
                    {product.description}
                  </p>
                </div>
                {discountedPrice < product.price && (
                  <div className={styles["discount-badge"]}>
                    -{((1 - discountedPrice / product.price) * 100).toFixed(0)}%
                  </div>
                )}
                <div className={styles["product-price"]}>
                  {discountedPrice < product.price ? (
                    <>
                      <span className={styles["original-price"]}>
                        {product.price.toFixed(2)}€
                      </span>
                      <span className={styles["discounted-price"]}>
                        {discountedPrice.toFixed(2)} €
                      </span>
                    </>
                  ) : (
                    <span className={styles["base-price"]}>
                      {product.price.toFixed(2)} €
                    </span>
                  )}
                </div>
                <div className={styles["product-quantity"]}>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className={styles["product-removal"]}>
                  <a
                    className={styles["remove-product"]}
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Supprimer
                  </a>
                </div>
                <div className={styles["product-line-price"]}>
                  {(product.quantity * discountedPrice).toFixed(2)} €
                </div>
              </div>
            );
          })}

          <div className={styles["totals"]}>
            <div className={styles["totals-item"]}>
              <label>Sous-total</label>
              <div className={styles["totals-value"]} id="cart-subtotal">
                {calculatedSubTotal.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-tax">
              <label>TVA (20%)</label>
              <div className={styles["totals-value"]} id="cart-tax">
                {tax.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-shipping">
              <label>Frais de livraison</label>
              <div className={styles["totals-value"]} id="cart-shipping">
                {shippingCost.toFixed(2)} €
              </div>
            </div>
            <div
              className={`${styles["totals-item"]} ${styles["totals-item-total"]}`}
              id="cart-total"
            >
              <label>Total</label>
              <div className={styles["totals-value"]} id="cart-total">
                {totalAmount.toFixed(2)} €
              </div>
            </div>
          </div>

          <button onClick={handleOrder} className={styles["checkout"]}>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}
