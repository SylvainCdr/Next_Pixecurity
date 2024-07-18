import { useState } from "react";
import { BASE_URL } from "../url";

const useFavorites = () => {
  const [, setIsAddingToFavorites] = useState(false);
  const [, setIsInFavorites] = useState(false);

  const addToFavorites = async (
    userId,
    productId,
    productName,
    productPrice,
    productRef,
    productImage
  ) => {
    try {
      setIsAddingToFavorites(true);

      const response = await fetch(`${BASE_URL}/users/${userId}/add-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          name: productName,
          price: productPrice,
          ref: productRef,
          image: productImage,
        }),
      });

      if (response.ok) {
        setIsInFavorites(true);
        return true;
      } else {
        console.error("Erreur lors de l'ajout du produit aux favoris");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      return false;
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const checkFavorite = async (userId, productId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${userId}/check-favorite/${productId}`
      );

      if (response.ok) {
        const data = await response.json();
        return data.isInFavorites;
      } else {
        console.error("Error checking favorites:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error network issue during checkFavorite:", error);
      return false;
    }
  };

  const removeFromFavorites = async (userId, productId) => {
    try {
      setIsAddingToFavorites(true);

      const response = await fetch(
        `${BASE_URL}/users/${userId}/delete-favorite/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setIsInFavorites(false);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      return false;
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const getFavorites = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/favorites`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching favorites:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error network issue during getFavorites:", error);
      return [];
    }
  };

  return {
    addToFavorites,
    checkFavorite,
    removeFromFavorites,
    getFavorites,
  };
};

export default useFavorites;
