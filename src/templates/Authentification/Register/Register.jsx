import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.scss";
import Link from "next/link";
import Aos from "aos";
import { BASE_URL } from "@/url";
import Head from "next/head";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [salesperson, setSalesperson] = useState("Aucun");
  const [errors, setErrors] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidLastName = (name) => /^[a-zA-Z\s]{2,}$/.test(name);
  const isValidFirstName = (name) => /^[a-zA-Z\s]{2,}$/.test(name);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(isValidEmail(value) ? "" : "Email invalide");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      isValidPassword(value)
        ? ""
        : "Mot de passe invalide (au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (?=.*[@$!%*?&))"
    );
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(
      isValidLastName(value)
        ? ""
        : "Nom invalide (au minimum 2 caractères alphabétiques)"
    );
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(
      isValidFirstName(value)
        ? ""
        : "Prénom invalide (au minimum 2 caractères alphabétiques)"
    );
  };

  // const handleSalespersonChange = (e) => {
  //   const value = e.target.value;
  //   setSalesperson(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isValidLastName(lastName) ||
      !isValidFirstName(firstName)
    ) {
      return; // Si les champs ne sont pas valides, arrêter ici
    }

    let user = {
      email,
      password,
      lastName,
      firstName,
      company,
      salesperson,
    };

    fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrors([data.error]);
          Swal.fire({
            icon: "error",
            title: "Erreur d'inscription",
            text: data.error,
          });
        } else {
          setErrors(null);
          // Alert et redirection seulement en cas de succès
          Swal.fire({
            icon: "success",
            title: "Inscription réussie!",
            text: "Vous pouvez maintenant vous connecter.",
            timer: 2500,
          }).then(() => {
            window.location.href = "/connexion";
          });
        }
      })
      .catch((error) => console.error(error));
  };

  //Aos
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          as="image"
        />
      </Head>
      <div className={styles["register-container"]}>
        <div data-aos="fade-right" className={styles["section-1"]}>
          <form onSubmit={handleSubmit}>
            <Link href="/connexion">
              <button> Se connecter</button>
            </Link>
            <span>――――― OU ―――――</span>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {firstNameError && (
              <span className={styles["error-message"]}>{firstNameError}</span>
            )}

            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              value={lastName}
              onChange={handleLastNameChange}
            />
            {lastNameError && (
              <span className={styles["error-message"]}>{lastNameError}</span>
            )}

            <label htmlFor="company">Entreprise (optionnel)</label>
            <input
              type="text"
              name="company"
              id="company"
              onChange={(e) => setCompany(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <span className={styles["error-message"]}>{emailError}</span>
            )}

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <span className={styles["error-message"]}>{passwordError}</span>
            )}

            {/* checkbox pour les CGV et la politique de confidentialité */}
            <div className={styles.cgv}>
              <input type="checkbox" name="cgu" id="cgu" required />
              <label htmlFor="cgu">
                J'accepte les
                <Link href="/cgv" target="_blank">
                  CGV
                </Link>
                et la
                <Link href="/politique-de-confidentialite" target="_blank">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <button>S'inscrire</button>
          </form>
        </div>

        {errors && (
          <div className={styles["validation-errors"]}>
            <p>Erreur(s) de validation :</p>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
