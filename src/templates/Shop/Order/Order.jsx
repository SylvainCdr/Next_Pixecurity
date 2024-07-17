import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";
import styles from "./style.module.scss";
import { useParams } from "next/navigation";
import { useGetUser } from "@/Components/useGetUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp = /^(\+33|0)[1-9](\d{2}){4}$/;

const schema = yup.object().shape({
  company: yup.string().required("L'entreprise est requise"),
  phone: yup
    .string()
    .required("Le téléphone est requis")
    .matches(phoneRegExp, "Numéro de téléphone invalide"),
  billingStreet: yup.string().required("La rue de facturation est requise"),
  billingCity: yup.string().required("La ville de facturation est requise"),
  billingZip: yup.string().required("Le code postal de facturation est requis"),
  billingCountry: yup.string().required("Le pays de facturation est requis"),
  deliveryStreet: yup.string().required("La rue de livraison est requise"),
  deliveryCity: yup.string().required("La ville de livraison est requise"),
  deliveryZip: yup.string().required("Le code postal de livraison est requis"),
  deliveryCountry: yup.string().required("Le pays de livraison est requis"),
});

export default function Order() {
  const params = useParams();
  const orderId = params?.id;

  const user = useGetUser();
  const [sameAddress, setSameAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (sameAddress) {
      setValue("deliveryStreet", watch("billingStreet"));
      setValue("deliveryCity", watch("billingCity"));
      setValue("deliveryZip", watch("billingZip"));
      setValue("deliveryCountry", watch("billingCountry"));
    } else {
      setValue("deliveryStreet", "");
      setValue("deliveryCity", "");
      setValue("deliveryZip", "");
      setValue("deliveryCountry", "");
    }
  }, [sameAddress, setValue, watch]);

  const onSubmit = async (form) => {
    try {
      if (!user?.company || !user?.phone) {
        const updateUserResponse = await fetch(
          `${BASE_URL}/users/${user._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company: form.company,
              phone: form.phone,
            }),
          }
        );

        if (!updateUserResponse.ok) {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de la mise à jour des informations utilisateur",
          });
          return;
        }

        user.phone = form.phone;
        user.company = form.company;
      }

      // Replace with your logic to determine if there are physical products
      const hasPhysicalProducts = true; // Replace with actual logic

      const updateResponse = await fetch(
        `${BASE_URL}/orders/${orderId}/delivery`,
        {
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
       
          }),
        }
      );

      if (!updateResponse.ok) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la mise à jour de la commande",
        });
        return;
      }

      const updatedOrder = await updateResponse.json();

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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("firstName")}
              />
              Nom :{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                defaultValue={user?.lastName}
                readOnly
                {...register("lastName")}
              />
              Entreprise:{" "}
              <input
                type="text"
                name="company"
                placeholder="Entreprise"
                defaultValue={user?.company}
                {...register("company")}
              />
              {errors.company && <p>{errors.company.message}</p>}
            </div>

            <div className={styles.contact}>
              Email :{" "}
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
                {...register("email")}
              />
              Téléphone :{" "}
              <input
                type="text"
                name="phone"
                placeholder="A renseigner"
                defaultValue={user?.phone}
                {...register("phone")}
              />
              {errors.phone && (
                <p className={styles.errorsForm}>{errors.phone.message} </p>
              )}
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
                {...register("billingStreet")}
              />
              {errors.billingStreet && (
                <p className={styles.errorsForm}>{errors.billingStreet.message}</p>
              )}
              <input
                type="text"
                name="billingZip"
                placeholder="Code Postal"
                {...register("billingZip")}
              />
              {errors.billingZip && (
                <p className={styles.errorsForm}>{errors.billingZip.message}</p>
              )}
              <input
                type="text"
                name="billingCity"
                placeholder="Ville"
                {...register("billingCity")}
              />
              {errors.billingCity && <p>{errors.billingCity.message}</p>}
              <select name="billingCountry" {...register("billingCountry")}>
                <option value="">Sélectionnez votre pays</option>
                <option value="france">France</option>
                <option value="belgique">Belgique</option>
                <option value="suisse">Suisse</option>
                <option value="luxembourg">Luxembourg</option>
              </select>
              {errors.billingCountry && (
                <p className={styles.errorsForm}>{errors.billingCountry.message}</p>
              )}

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

            {!sameAddress && (
              <div className={styles["delivery-address"]}>
                <p>Adresse de livraison : </p>
                <input
                  type="text"
                  name="deliveryStreet"
                  placeholder="Numéro et Rue"
                  {...register("deliveryStreet")}
                  value={deliveryAddress.street}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      street: e.target.value,
                    })
                  }
                />
                {errors.deliveryStreet && (
                  <p className={styles.errorsForm}>{errors.deliveryStreet.message}</p>
                )}
                <input
                  type="text"
                  name="deliveryZip"
                  placeholder="Code Postal"
                  {...register("deliveryZip")}
                  value={deliveryAddress.zip}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      zip: e.target.value,
                    })
                  }
                />
                {errors.deliveryZip && (
                  <p className={styles.errorsForm}>{errors.deliveryZip.message}</p>
                )}
                <input
                  type="text"
                  name="deliveryCity"
                  placeholder="Ville"
                  {...register("deliveryCity")}
                  value={deliveryAddress.city}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      city: e.target.value,
                    })
                  }
                />
                {errors.deliveryCity && (
                  <p className={styles.errorsForm}>{errors.deliveryCity.message}</p>
                )}
                <select
                  name="deliveryCountry"
                  {...register("deliveryCountry")}
                  value={deliveryAddress.country}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      country: e.target.value,
                    })
                  }
                >
                  <option value="">Sélectionnez votre pays</option>
                  <option value="france">France</option>
                  <option value="belgique">Belgique</option>
                  <option value="suisse">Suisse</option>
                  <option value="luxembourg">Luxembourg</option>
                </select>
                {errors.deliveryCountry && (
                  <p className={styles.errorsForm}>{errors.deliveryCountry.message}</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.deliveryAndPayment}>
            <div className={styles["delivery-options"]}>
              <h2>
                <i className="fa-solid fa-truck"></i> ETAPE 3 : Paiement sécurisé Stripe
              </h2>
        
            </div>
          </div>

          <button type="submit">Passer au paiement</button>
        </form>
      </div>
    </div>
  );
}
