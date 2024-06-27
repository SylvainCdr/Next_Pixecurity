import { useState, useEffect } from "react";
import { BASE_URL } from "../url";
import { useGetUser } from "./useGetUser";

const getCartId = () => {
  const cartId = localStorage.getItem("cartId");
  if (cartId) return cartId;

  const cartIdGenered = window.crypto.randomUUID();
  localStorage.setItem("cartId", cartIdGenered);
  return cartIdGenered;
};

const useCart = () => {
  const [cart, setCart] = useState([]); // Contient les produits dans le panier
  const [isCartFetched, setIsCartFetched] = useState(false); // Indique si le panier a été récupéré depuis le serveur

  const user = useGetUser();
  const userId = user?._id;
  const cartItemsCount = cart?.length;

  const fetchCart = async () => {
    try {
      const cartId = getCartId();
      const response = await fetch(`${BASE_URL}/carts/${cartId}`);
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        setCart(data);
        setIsCartFetched(true);
      } else {
        console.error("Réponse du serveur:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = async (product, quantity = 1) => {
    try {
      const cartId = getCartId();
      const body = {
        cartId,
        user: userId,
        product: product._id,
        name: product.name,
        ref: product.ref,
        quantity,
      };

      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'ajout du produit au panier");
      }
      const _carts = await response.json();
      console.log({ _carts });
      setCart(_carts);
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async (cart) => {
    try {
      setCart((cs) => cs.filter((c) => c._id !== cart._id));
      const response = await fetch(`${BASE_URL}/carts/${cart?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const _carts = await response.json();
        console.log({ _carts });
        setCart(_carts);
      } else {
        console.error(
          "Erreur lors de la suppression du produit du panier:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Erreur réseau lors de la suppression du produit du panier:",
        error
      );
    }
  };

  return {
    isCartFetched,
    cart,
    cartItemsCount,

    fetchCart,
    addToCart,
    removeFromCart,
  };
};

export default useCart;
