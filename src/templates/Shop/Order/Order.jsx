import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";
import styles from "./style.module.scss";
import { useParams } from "next/navigation";
import { useGetUser } from "@/Components/useGetUser";

export default function Order() {
  const params = useParams();
  const orderId = params?.id;
  console.log({ orderId });

  // on récupère les informations de l'utilisateur connecté
  const user = useGetUser();

  const [sameAddress, setSameAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (sameAddress) {
      setDeliveryAddress({
        street: document.querySelector('input[name="billingStreet"]').value,
        city: document.querySelector('input[name="billingCity"]').value,
        zip: document.querySelector('input[name="billingZip"]').value,
        country: document.querySelector('select[name="billingCountry"]').value,
      });
    } else {
      setDeliveryAddress({
        street: "",
        city: "",
        zip: "",
        country: "",
      });
    }
  }, [sameAddress]);

  const handleOrderSubmission = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target));
    console.log({ orderId });
    console.log({ form });

    try {
      // Vérifier et mettre à jour les informations de l'utilisateur si elles ne sont pas déjà connues
      if (!user?.company || !user?.phone) {
        const updateUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: form.company,
            phone: form.phone,
          }),
        });

        if (!updateUserResponse.ok) {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de la mise à jour des informations utilisateur",
          });
          return;
        }
      }

      // Mettre à jour les informations de livraison et de facturation
      const updateResponse = await fetch(`${BASE_URL}/orders/${orderId}/delivery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryAddress: {
            street: form.deliveryStreet,
            city: form.deliveryCity,
            zip: form.deliveryZip,
            country: form.deliveryCountry,
          },
          billingAddress: {
            street: form.billingStreet,
            city: form.billingCity,
            zip: form.billingZip,
            country: form.billingCountry,
          },
          delivery: {
            method: form.deliveryMethod,
            fee: 20, // Ajustez en fonction de votre logique de calcul des frais de livraison
          },
        }),
      });

      if (!updateResponse.ok) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la mise à jour de la commande",
        });
        return;
      }

      const updatedOrder = await updateResponse.json();

      // Créer la session de paiement Stripe
      const response = await fetch(`${BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: updatedOrder._id,
        }),
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la création de la session de paiement",
        });
        return;
      }

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la session de paiement",
      });
    }
  };

  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-page"]}>
        <h1>Commande</h1>

        <form method="POST" onSubmit={handleOrderSubmission}>
          <h2>
            <i className="fa-solid fa-user"></i> ETAPE 1 : Informations
            personnelles
          </h2>
          <div className={styles["customer-infos"]}>
            <div className={styles.details}>
              Prénom :{" "}
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                defaultValue={user?.firstName}
                readOnly
              />
              Nom :{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                defaultValue={user?.lastName}
                readOnly
              />
              Entreprise:{" "}
              <input
                type="text"
                name="company"
                placeholder="Entreprise"
                defaultValue={user?.company}
              />
            </div>

            <div className={styles.contact}>
              Email :{" "}
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
              />
              Téléphone :{" "}
              <input
                type="text"
                name="phone"
                placeholder="A renseigner"
                defaultValue={user?.phone}
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
                name="billingStreet"
                placeholder="Numéro et Rue"
              />
              <input
                type="text"
                name="billingZip"
                placeholder="Code Postal"
              />
              <input
                type="text"
                name="billingCity"
                placeholder="Ville"
              />

              <select name="billingCountry">
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
                  onChange={(e) => setSameAddress(e.target.checked)}
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
                name="deliveryStreet"
                placeholder="Numéro et Rue"
                value={deliveryAddress.street}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
                }
              />
              <input
                type="text"
                name="deliveryZip"
                placeholder="Code Postal"
                value={deliveryAddress.zip}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, zip: e.target.value })
                }
              />
              <input
                type="text"
                name="deliveryCity"
                placeholder="Ville"
                value={deliveryAddress.city}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                }
              />

              <select
                name="deliveryCountry"
                value={deliveryAddress.country}
                onChange={(e) =>
                  setDeliveryAddress({ ...deliveryAddress, country: e.target.value })
                }
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
                <i className="fa-solid fa-truck"></i> ETAPE 3 : Mode de
                livraison
              </h2>
              <select name="deliveryMethod">
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
