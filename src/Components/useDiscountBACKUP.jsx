import { useState, useEffect } from "react";
import { BASE_URL } from "@/url";

const useDiscount = (userId) => {
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

  const applyDiscounts = (product) => {
    if (loading || error) {
      return product.price;
    }

    let finalPrice = product.price;
    let highestDiscount = 0;
    let highestDiscountType = null;

    discounts.forEach((discount) => {
      const isDateValid = new Date(discount.startDate) <= new Date() && new Date(discount.endDate) >= new Date();
      
      // Vérification des remises globales
      if (discount.isGlobalDiscount) {
        if (discount.targetedUsers.length === 0 || discount.targetedUsers.includes(userId)) {
          if (isDateValid) {
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
        }
      } else {
        // Vérification des remises non globales
        const isUserTargeted = discount.targetedUsers.length === 0 || discount.targetedUsers.includes(userId);
        const isProductTargeted = discount.products.includes(product._id);
        const isBrandTargeted = discount.targetedBrands.includes(product.brand);

        if (isDateValid && isUserTargeted && (isProductTargeted || isBrandTargeted)) {
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
      }
    });

    if (highestDiscountType === "percentage") {
      finalPrice -= (finalPrice * highestDiscount) / 100;
    } else if (highestDiscountType === "fixed") {
      finalPrice -= highestDiscount;
    }

    return finalPrice;
  };

  return {
    applyDiscounts,
  };
};
