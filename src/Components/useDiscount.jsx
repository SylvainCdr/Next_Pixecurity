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

  const applyDiscountsForProductsDisplay = (product) => {
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
      const isProductTargeted = discount.products.includes(product._id);
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

  return {
    applyDiscountsForProductsDisplay,
  };
};

export default useDiscount;
