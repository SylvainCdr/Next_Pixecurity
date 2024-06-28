import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import { BASE_URL } from "@/url";
import { useGetUser } from "@/Components/useGetUser";
import { useCartContext } from "@/Components/cartContext";

function useGetDiscount() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { discounts, loading, error };
}

export default function Cart({ carouselProducts }) {
  const { carts, addToCart, removeFromCart } = useCartContext();
  const user = useGetUser();
  const userId = user?._id;

  const { discounts, loading, error } = useGetDiscount();

  const applyDiscounts = (product) => {
    if (loading || error) {
      return product.price;
    }

    let finalPrice = product.price;
    let globalDiscount = 0;
    let globalDiscountType = null;

    let specificDiscount = 0;
    let specificDiscountType = null;

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

      if (isDateValid && isGlobalAndUserTargeted) {
        if (discount.discountType === "percentage") {
          globalDiscount += discount.discountValue;
          globalDiscountType = "percentage";
        } else if (discount.discountType === "fixed") {
          globalDiscount += discount.discountValue;
          globalDiscountType = "fixed";
        }
      }

      if (
        isDateValid &&
        isUserTargeted &&
        (isProductTargeted || isBrandTargeted)
      ) {
        if (discount.discountType === "percentage") {
          if (
            discount.discountValue > specificDiscount &&
            specificDiscountType !== "fixed"
          ) {
            specificDiscount = discount.discountValue;
            specificDiscountType = "percentage";
          }
        } else if (discount.discountType === "fixed") {
          const fixedDiscountValue =
            (discount.discountValue / product.price) * 100;
          if (fixedDiscountValue > specificDiscount) {
            specificDiscount = fixedDiscountValue;
            specificDiscountType = "fixed";
          }
        }
      }
    });

    if (globalDiscountType === "percentage") {
      finalPrice -= (finalPrice * globalDiscount) / 100;
    } else if (globalDiscountType === "fixed") {
      finalPrice -= globalDiscount;
    }

    if (specificDiscountType === "percentage") {
      finalPrice -= (finalPrice * specificDiscount) / 100;
    } else if (specificDiscountType === "fixed") {
      finalPrice -= specificDiscount;
    }

    return finalPrice;
  };

  const calculatedSubTotal =
    carts?.reduce((acc, c) => {
      const product = c.product;
      const discountedPrice = applyDiscounts(product);
      return acc + c.quantity * discountedPrice;
    }, 0) ?? 0;
  const tax = calculatedSubTotal * 0.2;
  const shippingCost = 20;
  const totalAmount = calculatedSubTotal + tax + shippingCost;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleQuantityChange = (cart, quantity) => {
    if (quantity >= 1) {
      addToCart(cart.product, quantity);
    }
    if (quantity === 0) {
      removeFromCart(cart);
    }
  };

  const handleRemoveFromCart = (cart) => {
    removeFromCart(cart);
  };

  if (!carts || carts?.length === 0) {
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
            <p className={styles["product-image"]}>Image</p>
            <p className={styles["product-details"]}>Produit</p>
            <p className={styles["product-price"]}>Prix HT</p>
            <p className={styles["product-quantity"]}>Quantité</p>
            <p className={styles["product-removal"]}>Supprimer</p>
            <p className={styles["product-line-price"]}>Total HT</p>
          </div>

          {carts?.map((cart) => {
            const product = cart.product;
            const discountedPrice = applyDiscounts(product);
            return (
              <div className={styles["product"]} key={cart._id}>
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
                  {/* <p className={styles["product-description"]}>
                    {product.description}
                  </p> */}
                </div>
                {discountedPrice < product.price && (
                  <p className={styles["discount-badge"]}>
                    -{((1 - discountedPrice / product.price) * 100).toFixed(0)}%
                  </p>
                )}
                <div className={styles["product-price"]}>
                  {discountedPrice < product.price ? (
                    <>
                      <span className={styles["original-price"]}>
                        {product.price}€
                      </span>
                      <span className={styles["discounted-price"]}>
                        {discountedPrice.toFixed(2)} €
                      </span>
                    </>
                  ) : (
                    <span className={styles["base-price"]}>
                      {product.price} €
                    </span>
                  )}
                </div>
                <div className={styles["product-quantity"]}>
                  <input
                    type="number"
                    defaultValue={cart.quantity}
                    onChange={(e) =>
                      handleQuantityChange(cart, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className={styles["product-removal"]}>
                  <a
                    className={styles["remove-product"]}
                    onClick={() => handleRemoveFromCart(cart)}
                  >
                    Supprimer
                  </a>
                </div>
                <p className={styles["product-line-price"]}>
                  {(cart.quantity * discountedPrice).toFixed(2)} €
                </p>
              </div>
            );
          })}

          <div className={styles["totals"]}>
            <div className={styles["totals-item"]}>
              <p>Sous-total</p>
              <div className={styles["totals-value"]} id="cart-subtotal">
                {calculatedSubTotal.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-tax">
              <p>TVA (20%)</p>
              <div className={styles["totals-value"]} id="cart-tax">
                {tax.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-shipping">
              <p>Frais de livraison</p>
              <div className={styles["totals-value"]} id="cart-shipping">
                {shippingCost.toFixed(2)} €
              </div>
            </div>
            <div
              className={`${styles["totals-item"]} ${styles["totals-item-total"]}`}
              id="cart-total"
            >
              <p>Total</p>
              <div className={styles["totals-value"]} id="cart-total">
                {totalAmount.toFixed(2)} €
              </div>
            </div>
          </div>

          <Link
            href="/commande"
            className={styles["checkout"]}
            style={{ textDecoration: "none" }}
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  );
}
