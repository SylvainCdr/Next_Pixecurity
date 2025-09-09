import { useState, useEffect, createContext, useContext, useRef } from "react";
import { BASE_URL } from "../url";
import { useGetUser } from "./useGetUser";

export const getCartId = () => {
  const cartId = localStorage.getItem("cartId");
  if (cartId) return cartId;

  const cartIdGenered = window.crypto.randomUUID();
  localStorage.setItem("cartId", cartIdGenered);
  return cartIdGenered;
};

const sum = (arrayNumbers) =>
  arrayNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

const useCart = () => {
  const [carts, setCarts] = useState([]);
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const [visitorEmail, setVisitorEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("visitorEmail") || "";
    }
    return "";
  });

  const [visitorChoiceMade, setVisitorChoiceMade] = useState(false);

  const user = useGetUser();
  const userId = user?._id;
  const popupTimeoutRef = useRef(null);

  const cartItemsCount = Array.isArray(carts)
    ? sum(carts.map((c) => c.quantity))
    : 0;

  const fetchCart = async () => {
    try {
      const cartId = getCartId();
      const response = await fetch(`${BASE_URL}/carts/${cartId}`);
      if (response.ok) {
        const data = await response.json();
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedChoice = localStorage.getItem("visitorChoiceMade");
      setVisitorChoiceMade(savedChoice === "true");
    }
  }, []);

  useEffect(() => {
    if (visitorEmail) {
      localStorage.setItem("visitorEmail", visitorEmail);
    }
  }, [visitorEmail]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedChoice = localStorage.getItem("visitorChoiceMade");
      if (savedChoice === "true") {
        setVisitorChoiceMade(true);
      }
    }
  }, []);

  const addToCart = async (product, quantity = 1, email = null) => {
    try {
      const cartId = getCartId();
      const body = {
        cartId,
        user: userId || null,
        visitorEmail: email || localStorage.getItem("visitorEmail") || null,
        product: product._id,
        name: product.name,
        ref: product.ref,
        quantity,
      };

      // Optimistic update
      // Optimistic update : on met directement la nouvelle quantité
      setCarts((cs) => {
        const cartFound = cs.find((c) => c.product._id === product._id);
        if (cartFound) {
          return cs.map((c) => {
            if (c.product._id === product._id) {
              return { ...c, quantity }; // mettre exactement la quantité souhaitée
            }
            return c;
          });
        }
        return [...cs, body];
      });

      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'ajout du produit au panier");
      }

      const _carts = await response.json();
      setCarts(_carts);
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // Wrapper qui gère l'ouverture du popup

  const addToCartWrapper = (product, quantity = 1) => {
    // 1️⃣ Ajouter le produit immédiatement (optimistic)
    addToCart(
      product,
      quantity,
      visitorEmail || localStorage.getItem("visitorEmail") || null
    );

    // 2️⃣ Si pas d'utilisateur et pas de choix déjà fait, déclencher le popup après 5s
    if (!userId && !visitorChoiceMade) {
      setPendingProduct({ product, quantity });

      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);

      popupTimeoutRef.current = setTimeout(() => {
        setShowEmailPopup(true);
        popupTimeoutRef.current = null;
      }, 5000);
    }
  };

  // Validation du popup avec email
  const handleVisitorSubmit = () => {
    if (pendingProduct) {
      // Sauvegarder l'email dans le localStorage
      if (visitorEmail) {
        localStorage.setItem("visitorEmail", visitorEmail);
      }

      addToCart(pendingProduct.product, pendingProduct.quantity, visitorEmail);
      setPendingProduct(null);
    }
    setVisitorChoiceMade(true);
    localStorage.setItem("visitorChoiceMade", "true");
    setShowEmailPopup(false);
  };

  const handleVisitorSkip = () => {
    if (pendingProduct) {
      addToCart(
        pendingProduct.product,
        pendingProduct.quantity,
        visitorEmail || localStorage.getItem("visitorEmail") || null
      );
      setPendingProduct(null);
    }
    setVisitorChoiceMade(true);
    localStorage.setItem("visitorChoiceMade", "true");
    setShowEmailPopup(false);
  };

  const removeFromCart = async (cart) => {
    try {
      setCarts((cs) => cs.filter((c) => c._id !== cart._id));

      const response = await fetch(`${BASE_URL}/carts/${cart?._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const _carts = await response.json();
        setCarts(_carts);
      } else {
        console.error("Erreur lors de la suppression:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  return {
    isCartFetched,
    carts,
    cartItemsCount,
    fetchCart,
    addToCart: addToCartWrapper, // on expose le wrapper
    removeFromCart,

    // pour gérer le popup
    showEmailPopup,
    setShowEmailPopup,
    visitorEmail,
    setVisitorEmail,
    handleVisitorSubmit,
    handleVisitorSkip,
  };
};

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}

      {/* Popup email */}
      {cart.showEmailPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.69)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "50px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3
              style={{
                color: "#575757ff",
                marginBottom: "20px",
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Enregistrez votre panier
            </h3>
            <input
              type="email"
              placeholder="Votre email"
              value={cart.visitorEmail}
              onChange={(e) => cart.setVisitorEmail(e.target.value)}
              style={{
                width: "95%",
                padding: "8px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={cart.handleVisitorSubmit}>Valider</button>
              <button onClick={cart.handleVisitorSkip}>
                Continuer sans email
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
