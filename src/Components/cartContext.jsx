import { useState, useEffect, createContext, useContext } from "react";
import { BASE_URL } from "../url";
import { useGetUser } from "./useGetUser";
import Swal from "sweetalert2";

const getCartId = () => {
  const cartId = localStorage.getItem("cartId");
  if (cartId) return cartId;

  const cartIdGenered = window.crypto.randomUUID();
  localStorage.setItem("cartId", cartIdGenered);
  return cartIdGenered;
};

const useCart = () => {
  const [carts, setCarts] = useState([]); // Contient les produits dans le panier
  const [isCartFetched, setIsCartFetched] = useState(false); // Indique si le panier a été récupéré depuis le serveur
  const user = useGetUser();

  const userId = user?._id;
  const cartItemsCount = carts?.length;

  const fetchCart = async () => {
    try {
      const cartId = getCartId();
      const response = await fetch(`${BASE_URL}/carts/${cartId}`);
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        setCarts(data);
        setIsCartFetched(true);
      } else {
        console.error("Réponse du serveur:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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

      // Optimistic update
      setCarts((cs) => {
        const cartFound = cs.find((c) => c.product._id === product._id);
        if (cartFound)
          return cs.map((c) => {
            if (c.product.id === product._id) {
              c.quantity = quantity;
              return cartFound;
            }
            return c;
          });

        return [...cs, body];
      });

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
      setCarts(_carts);
      if (quantity === 1) {
        Swal.fire({
          icon: "info",
          title: "Produit ajouté au panier avec succès!",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async (cart) => {
    try {
      // Optimistic update
      setCarts((cs) => cs.filter((c) => c._id !== cart._id));

      const response = await fetch(`${BASE_URL}/carts/${cart?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const _carts = await response.json();
        setCarts(_carts);
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
    carts,
    cartItemsCount,

    fetchCart,
    addToCart,
    removeFromCart,
  };
};

// Hook pour récupérer le token de l'utilisateur connecté
const CartContext = createContext();

// Hook pour récupérer le panier
export const useCartContext = () => useContext(CartContext);

// Provider pour le panier
export const CartProvider = ({ children }) => {
  const {
    isCartFetched,
    carts,
    cartItemsCount,
    fetchCart,
    addToCart,
    removeFromCart,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        isCartFetched,
        carts,
        cartItemsCount,
        fetchCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
