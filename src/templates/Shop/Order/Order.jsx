import React, { useState, useEffect } from "react";
import useCart from "@/Components/useCart";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";
import styles from "./style.module.scss";
import { useGetUser } from "@/Components/useGetUser";

export default function Order() {
  const user = useGetUser();
  const { cart } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    if (user) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        user: user._id,
      }));
    }
  }, [user]);

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
        console.error("Error fetching discounts:", err);
      }
    };

    fetchDiscounts();
  }, []);

  const applyDiscounts = (product) => {
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
          discount.targetedUsers.includes(user?._id));
      const isUserTargeted =
        discount.targetedUsers.length === 0 ||
        discount.targetedUsers.includes(user?._id);
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

  const [order, setOrder] = useState({
    user: "",
    deliveryAddress: { street: "", city: "", zip: "", country: "" },
    billingAddress: { street: "", city: "", zip: "", country: "" },
    items: [],
    delivery: {
      method: "",
      fee: "20",
    },
    orderDate: new Date().toLocaleDateString(),
    payment: {
      method: "stripe",
      paid: false,
    },
    totalAmount: "",
  });

  useEffect(() => {
    const calculatedSubTotal = cart.reduce((acc, product) => {
      const discountedPrice = applyDiscounts(product); // Appliquer le rabais au prix du produit
      return acc + product.quantity * discountedPrice;
    }, 0);
    setSubTotal(calculatedSubTotal);
    const calculatedTax = calculatedSubTotal * 0.2;
    setTax(calculatedTax);
    const calculatedTotalAmount = calculatedSubTotal + calculatedTax + shippingCost;
    setTotalAmount(calculatedTotalAmount);
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        ref: product.ref,
        priceAtOrderTime: applyDiscounts(product),
      })),
      totalAmount: calculatedTotalAmount,
    }));
  }, [cart, shippingCost, discounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "zip", "country"].includes(name)) {
      setOrder((prev) => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [name]: value,
        },
        billingAddress: {
          ...prev.billingAddress,
          [name]: value,
        }
      }));
    } else if (name === "deliveryMethod") {
      setOrder((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          method: value,
        },
      }));
    } else if (name === "phone") {
      setPhoneNumber(value);
    } else if (name === "company") {
      setCompany(value);
    } else {
      const updatedUser = { ...user, [name]: value };
      fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  const handleOrderSubmission = async (e) => {
    e.preventDefault();
    if (
      !user?._id ||
      !user?.firstName ||
      !user?.lastName ||
      !user?.email ||
      !phoneNumber ||
      !order.deliveryAddress.street ||
      !order.deliveryAddress.zip ||
      !order.deliveryAddress.city ||
      !order.deliveryAddress.country ||
      !order.billingAddress.street ||
      !order.billingAddress.zip ||
      !order.billingAddress.city ||
      !order.billingAddress.country ||
      !order.delivery.method 
    ) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        timer: 2000,
      });
      return;
    }

    console.log("Creating order with data:", {
      user: user._id,
      deliveryAddress: order.deliveryAddress,
      billingAddress: order.billingAddress,
      items: order.items,
      delivery: order.delivery,
      totalAmount: order.totalAmount,
      payment: {
        method: 'stripe',
        paid: false
      },
      status: 'pending'
    });

    const orderResponse = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...order,
        payment: {
          method: 'stripe',
          paid: false
        },
        status: 'pending'
      }),
    });
    const newOrder = await orderResponse.json();

    if (!orderResponse.ok) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la commande",
      });
      return;
    }

    console.log("Order created successfully:", newOrder);

    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        amount: order.totalAmount,
        currency: "eur",
        orderId: newOrder._id,
      }),
    });

    const session = await response.json();

    if (response.ok) {
      window.location.href = session.url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la session de paiement",
      });
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-page"]}>
        <h1>Commande</h1>

        <form onSubmit={handleOrderSubmission}>
          <h2>
            <i className="fa-solid fa-user"></i> ETAPE 1 : Informations personnelles
          </h2>
          <div className={styles["customer-infos"]}>
            <div className={styles.details}>
              Prénom :{" "}
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={user.firstName || ""}
                onChange={handleChange}
              />
              Nom :{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={user.lastName || ""}
                onChange={handleChange}
              />
              Entreprise:{" "}
              <input
                type="text"
                name="company"
                placeholder="Entreprise"
                value={company || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.contact}>
              Email :{" "}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email || ""}
                onChange={handleChange}
              />
              Téléphone :{" "}
              <input
                type="text"
                name="phone"
                placeholder="A renseigner"
                value={phoneNumber || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <h2>
            <i className="fa-solid fa-house"></i> ETAPE 2 : Adresses
          </h2>
          <div className={styles["address-details"]}>
            <div className={styles["billing-address"]}>
              <p>Adresse de facturation : </p>
              <input
                type="text"
                name="street"
                placeholder="Numéro et Rue"
                value={order.billingAddress.street}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      street: e.target.value,
                    }
                  }))
                }
              />
              <input
                type="text"
                name="zip"
                placeholder="Code Postal"
                value={order.billingAddress.zip}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      zip: e.target.value,
                    }
                  }))
                }
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={order.billingAddress.city}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      city: e.target.value,
                    }
                  }))
                }
              />

              <select
                name="country"
                value={order.billingAddress.country}
                onChange={(e) =>
                  setOrder((prev) => ({
                    ...prev,
                    billingAddress: {
                      ...prev.billingAddress,
                      country: e.target.value,
                    }
                  }))
                }
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="france">France</option>
                <option value="belgique">Belgique</option>
                <option value="suisse">Suisse</option>
                <option value="luxembourg">Luxembourg</option>
              </select>

              <div className={styles["same-address"]}>
                <input
                  type="checkbox"
                  id="same-address"
                  name="same-address"
                  className={styles.checkbox}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setOrder((prev) => ({
                        ...prev,
                        deliveryAddress: { ...prev.billingAddress },
                      }));
                    } else {
                      setOrder((prev) => ({
                        ...prev,
                        deliveryAddress: {
                          street: "",
                          city: "",
                          zip: "",
                          country: "",
                        },
                      }));
                    }
                  }}
                />
                <label htmlFor="same-address">
                  Adresse de livraison identique
                </label>
              </div>
            </div>

            <div className={styles["delivery-address"]}>
              <p>Adresse de livraison : </p>
              <input
                type="text"
                name="street"
                placeholder="Numéro et Rue"
                value={order.deliveryAddress.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Code Postal"
                value={order.deliveryAddress.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={order.deliveryAddress.city}
                onChange={handleChange}
              />

              <select
                name="country"
                value={order.deliveryAddress.country}
                onChange={handleChange}
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="france">France</option>
                <option value="belgique">Belgique</option>
                <option value="suisse">Suisse</option>
                <option value="luxembourg">Luxembourg</option>
              </select>
            </div>
          </div>

          <div className={styles.deliveryAndPayment}>
            <div className={styles["delivery-options"]}>
              <h2>
                <i className="fa-solid fa-truck"></i> ETAPE 3 : Mode de livraison
              </h2>
              <select
                name="deliveryMethod"
                value={order.delivery.method}
                onChange={handleChange}
              >
                <option value="">Sélectionnez le mode de livraison</option>
                <option value="dhl">DHL</option>
                <option value="chronopost">Chronopost</option>
              </select>
              <img
                src="https://www.chronopost.fr/sites/chronopost/themes/custom/chronopost/images/chronopost_logo.png"
                className={styles.chrono}
                alt="chronopost"
              />
              <img
                src="https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg"
                alt="DHL"
              />
            </div>
          </div>

          <button type="submit">Passer au paiement</button>
        </form>
      </div>
    </div>
  );
}
