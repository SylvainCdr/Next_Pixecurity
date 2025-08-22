import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";
import { BASE_URL } from "@/url";
import { useGetUser } from "@/Components/useGetUser";
import { getCartId, useCartContext } from "@/Components/cartContext";
import { useRouter } from "next/router";
import { createOrder as createOrderAPI } from "@/api/orders";
import { CartRequestQuoteModal } from "@/Components/CartRequestQuoteModal/CartRequestQuoteModal";

export default function Cart({ carouselProducts }) {
  const { carts } = useCartContext();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const user = useGetUser();
  const userId = user?._id;

  const router = useRouter();

  const createOrder = async () => {
    const cartId = getCartId();
    const allDigital = carts.every((c) => c.product.productType === "soft");
    const shippingCost = allDigital ? 0 : 20;
    const shippingMethod = allDigital ? "email" : "dhl";

    const orderId = await createOrderAPI({ userId, cartId, shippingCost, shippingMethod });
    router.push("/commande/" + orderId);
  };

  if (!carts || carts?.length === 0)
    return <EmptyCart carouselProducts={carouselProducts} />;

  // Calculer le total de la commande
  const calculatedSubTotal = carts?.reduce((acc, c) => {
    const product = c.product;
    const discountedPrice = product.discountPrice;
    return acc + c.quantity * discountedPrice;
  }, 0) ?? 0;
  
  const tax = calculatedSubTotal * 0.2;
  const allDigital = carts.every((c) => c.product.productType === "soft");
  const shippingCost = allDigital ? 0 : 20;
  const totalAmount = calculatedSubTotal + tax + shippingCost;

  // Vérifier si le total est inférieur à 500 €
  const isAmountValid = totalAmount >= 500;

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-content"]}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "42px",
          }}
        >
          <h1>Panier</h1>
          <button
            onClick={() => {
              localStorage.removeItem("cartId");
              window.location.reload();
            }}
            className={styles["empty-cart-btn"]}
          >
            Vider le panier
          </button>
        </div>
        <div className={styles["shopping-cart"]}>
          <div className={styles["column-labels"]}>
            <p className={styles["product-image"]}>Image</p>
            <p className={styles["product-details"]}>Produit</p>
            <p className={styles["product-price"]}>Prix HT</p>
            <p className={styles["product-quantity"]}>Quantité</p>
            <p className={styles["product-removal"]}>Supprimer</p>
            <p className={styles["product-line-price"]}>Total HT</p>
          </div>

          {carts?.map((cart) => (
            <CartItem key={cart._id} cart={cart} />
          ))}

          <Totals carts={carts} />

          {/* Affichage du message si le montant est inférieur à 400 € */}
          {!isAmountValid && (
            <div className={styles["minimum-order-message"]}>
              <p  >Le montant minimum de commande est de 500 €.</p>
            </div>
          )}

          {/* Bouton commander */}
          {userId ? (
            <button
              className={styles["checkout"]}
              onClick={isAmountValid ? createOrder : null}
              disabled={!isAmountValid}
            >
              Commander
            </button>
          ) : (
            <button
              className={styles["checkout"]}
              onClick={() => router.push("/inscription")}
            >
              Se connecter pour commander
            </button>
          )}

          <CartRequestQuoteModal />
        </div>
      </div>
    </div>
  );
}



function CartItem({ cart }) {
  const product = cart.product;
  const { addToCart, removeFromCart } = useCartContext();

  const totalPrice = (cart.quantity * product.discountPrice).toFixed(2);
  const user = useGetUser();
  const userId = user?._id;
  const userIdParam = userId ? `?userId=${userId}` : "";

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      addToCart(cart.product, newQuantity);
    }
  };

  const handleKeyDown = (event) => {
    // Bloquer la saisie manuelle
    event.preventDefault();
  };

  return (
    <div className={styles.product}>
      <div className={styles["product-image"]}>
        <img
          src={
            product.image && product.image.startsWith("http")
              ? product.image
              : `${BASE_URL}${product.image}`
          }
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className={styles["product-details"]}>
        <div className={styles["product-title"]}>
          <Link href={`boutique/produit/${product._id}/${userIdParam}`} > {product.name} </Link>
          <p>Réf : {product.ref}</p>
          {/* <p>Réf : {product.productType}</p> */}
        </div>
      </div>
      {product.pourcentageDiscount > 0 && (
  <p className={styles["discount-badge"]}>
    -{product.pourcentageDiscount}%
  </p>
)}

    {/* {product.pourcentageDiscount && (
  <p className={styles["discount-badge"]}>
    -{product.pourcentageDiscount}%
  </p>
)} */}
<div className={styles["product-price"]}>
  {product.discountPrice && product.discountPrice < product.price ? (
    <>
      <span className={styles["original-price"]}>
        {product.price.toFixed(2)}€
      </span>
      <span className={styles["discounted-price"]}>
        {product.discountPrice.toFixed(2)} €
      </span>
    </>
  ) : (
    <span className={styles["base-price"]}>{product.price.toFixed(2)} €</span>
  )}
</div>

      <div className={styles["product-quantity"]}>
        <input
          type="number"
          min={1}
          value={cart.quantity}
          onChange={handleQuantityChange}
          onKeyDown={handleKeyDown}
          inputMode="none" // Bloque la saisie manuelle
        />
      </div>
      <div className={styles["product-removal"]}>
        <a
          className={styles["remove-product"]}
          onClick={() => removeFromCart(cart)}
        >
          Supprimer
        </a>
      </div>
      <p className={styles["product-line-price"]}>{totalPrice} €</p>
    </div>
  );
}

function Totals({ carts }) {
  const calculatedSubTotal = carts?.reduce((acc, c) => {
    const product = c.product;
    const discountedPrice = product.discountPrice;
    return acc + c.quantity * discountedPrice;
  }, 0) ?? 0;
  
  const tax = calculatedSubTotal * 0.2;
  
  const allDigital = carts.every((c) => c.product.productType === "soft");
  const shippingCost = allDigital ? 0 : 20;
  

  const totalAmount = calculatedSubTotal + tax + shippingCost;

  return (
    <div className={styles["totals"]}>
      <div className={styles["totals-item"]}>
        <p>Sous-total HT</p>
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
        <p>Frais de livraison  <img src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg" alt="dhl-logo" /></p>
        <div className={styles["totals-value"]} id="cart-shipping">
          {shippingCost.toFixed(2)} €
        </div>
      </div>
      <div
        className={`${styles["totals-item"]} ${styles["totals-item-total"]}`}
        id="cart-total"
      >
        <p>Total TTC</p>
        <div className={styles["totals-value"]} id="cart-total">
          {totalAmount.toFixed(2)} €
        </div>
      </div>
    </div>
  );
}

function EmptyCart({ carouselProducts }) {
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
