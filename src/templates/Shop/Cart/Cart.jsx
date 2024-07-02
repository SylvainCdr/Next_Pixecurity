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

export default function Cart({ carouselProducts }) {
  const { carts } = useCartContext();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  console.log({ carts });

  const user = useGetUser();
  const userId = user?._id;
  const router = useRouter();

  const createOrder = async () => {
    const cartId = getCartId();
    const orderId = await createOrderAPI({ userId, cartId });
    router.push("/commande/" + orderId);
  };

  if (!carts || carts?.length === 0)
    return <EmptyCart carouselProducts={carouselProducts} />;

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

          {carts?.map((cart) => (
            <CartItem key={cart._id} cart={cart} />
          ))}

          <Totals carts={carts} />
          <button className={styles["checkout"]} onClick={createOrder}>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItem({ cart }) {
  const product = cart.product;
  const { addToCart, removeFromCart } = useCartContext();

  const totalPrice = (cart.quantity * product.discountPrice).toFixed(2);

  const handleQuantityChange = (quantity) => {
    if (quantity < 1) return;

    addToCart(cart.product, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cart);
  };

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
        {/* <p className={styles["product-description"]}>{product.description}</p> */}
      </div>
      {product.pourcentageDiscount && (
        <p className={styles["discount-badge"]}>
          -{product.pourcentageDiscount}%
        </p>
      )}
      <div className={styles["product-price"]}>
        { /* If there is a discount price, display the original price and the discounted price */ }

        {product.discountPrice ? (
          <>
            <span className={styles["original-price"]}>{product.price.toFixed(2)}€</span>
            <span className={styles["discounted-price"]}>
              {product.discountPrice.toFixed(2)} €
            </span>
          </>
        ) : (
          <span className={styles["base-price"]}>{product.price} €</span>
        )}
      </div>
      <div className={styles["product-quantity"]}>
        <input
          type="number"
          min={1}
          defaultValue={cart.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
        />
      </div>
      <div className={styles["product-removal"]}>
        <a className={styles["remove-product"]} onClick={handleRemoveFromCart}>
          Supprimer
        </a>
      </div>
      <p className={styles["product-line-price"]}>{totalPrice} €</p>
    </div>
  );
}

function Totals({ carts }) {
  const calculatedSubTotal =
    carts?.reduce((acc, c) => {
      const product = c.product;
      const discountedPrice = product.discountPrice;
      return acc + c.quantity * discountedPrice;
    }, 0) ?? 0;
  const tax = calculatedSubTotal * 0.2;
  const shippingCost = 20;
  const totalAmount = calculatedSubTotal + tax + shippingCost;

  return (
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
