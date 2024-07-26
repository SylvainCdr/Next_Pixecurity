import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function InfosUpdate() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    salesperson: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    fetch(`${BASE_URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      billingAddress: {
        ...prevUser.billingAddress,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,30}$/;
    const companyPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]{0,30}$/; // Company can be empty
    const phonePattern = /^[0-9+]{0,20}$/; // Phone can be empty

    if (!user.firstName.trim() || !namePattern.test(user.firstName)) {
      newErrors.firstName =
        "Le prénom doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider le nom
    if (!user.lastName.trim() || !namePattern.test(user.lastName)) {
      newErrors.lastName =
        "Le nom doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider l'entreprise
    if (!companyPattern.test(user.company)) {
      newErrors.company =
        "L'entreprise doit comporter des lettres et/ou des chiffres (max 30 caractères)";
    }

    // Valider le téléphone
    if (!phonePattern.test(user.phone)) {
      newErrors.phone =
        "Le téléphone doit comporter des chiffres et/ou le symbole + (max 20 caractères)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch(`${BASE_URL}/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Vos informations seront à jour à votre prochaine connexion",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/mon-compte";
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);

        Swal.fire({
          title: "Erreur lors de la mise à jour des informations",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className={styles["infosUpdate-container"]}>
      <h1>Modifier mes informations</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["update-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}

            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}

            <label htmlFor="company">Entreprise</label>
            <input
              type="text"
              id="company"
              name="company"
              value={user.company}
              onChange={handleChange}
            />
            {errors.company && (
              <span className={styles.error}>{errors.company}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly
            />


            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
            
            <label htmlFor="salesperson">Commercial(e) référent(e)</label>
            <select
              name="salesperson"
              id="salesperson"
              value={user.salesperson}
              onChange={handleChange}
            >
              <option value="Aucun">Aucun</option>
              <option value="Kenza GAUTIAM">Kenza GAUTIAM</option>
              <option value="Fabrice VALLEE">Fabrice VALLEE</option>
              <option value="Yanis MEBARKI">Yanis MEBARKI</option>
              <option value="Abdulrhaman SHOUGRI">Abdulrhaman SHOUGRI</option>
            </select>
          </div>
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
