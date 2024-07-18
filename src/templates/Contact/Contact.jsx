import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import AOS from "aos";
import { BASE_URL } from "../../url";
import Head from "next/head";

function Contact() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [lastnameError, setLastnameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const isValidLastname = (name) => /^[a-zA-Z\s]{2,}$/.test(name);
  const isValidFirstname = (name) => /^[a-zA-Z\s]{2,}$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMessage = (message) => message.length >= 50;
  const isValidCompanyLength = (name) => name.length <= 30;

  const handleLastnameChange = (e) => {
    const value = e.target.value;
    setLastname(value);
    setLastnameError(
      isValidLastname(value) ? "" : "Nom invalide (minimum 2 lettres)"
    );
  };

  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);
    setFirstnameError(
      isValidFirstname(value) ? "" : "Prénom invalide (minimum 2 lettres)"
    );
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    if (isValidCompanyLength(value)) {
      setCompany(value);
      setCompanyError("");
    } else {
      setCompanyError(
        "Le nom de l'entreprise ne doit pas dépasser 30 caractères"
      );
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(isValidEmail(value) ? "" : "Email invalide");
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setMessageError(
      isValidMessage(value) ? "" : "Message invalide (au moins 50 caractères)"
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidLastname(lastname) ||
      !isValidFirstname(firstname) ||
      !isValidEmail(email) ||
      !isValidMessage(message) ||
      (company && !isValidCompanyLength(company))
    ) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez renseigner tous les champs correctement",
        icon: "error",
        timer: 1800,
      });
      return;
    }

  
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastname, firstname, company, email, message }),
    });

    if (response.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Message envoyé avec succès",
        showConfirmButton: false,
        timer: 1800,
      });

      setLastname("");
      setFirstname("");
      setCompany("");
      setEmail("");
      setMessage("");
      setLastnameError("");
      setFirstnameError("");
      setCompanyError("");
      setEmailError("");
      setMessageError("");
    } else {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite. Veuillez réessayer.",
        icon: "error",
        timer: 1800,
      });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2300,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Contactez-nous - Pixecurity</title>
        <meta
          name="description"
          content="Contactez Pixecurity pour toute demande de projet ou d'information sur nos solutions de sûreté. Nous sommes là pour répondre à vos besoins en sécurité."
        />
        <meta
          name="keywords"
          content="contact, nous contacter, projet, sécurité, solutions de sûreté, surveillance, Pixecurity, france, paris, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
        <meta name="author" content="Pixecurity" />
        {/* Autres balises meta spécifiques à cette page si nécessaire */}
      </Head>

      <div className={styles["contact-container"]}>
        <div className={styles["contact-section"]}>
          <div data-aos="flip-down" className={styles["visit-card"]}>
            <h2>Contactez-nous</h2>
            <h1>Let's Get In Touch</h1>
            <h3>
              Dites-nous qui vous êtes et expliquez nous votre problématique en
              quelques mots. Nous vous recontacterons dans les plus brefs délais
              pour lancer le projet.
            </h3>

            <p>
              <img src="assets/logo-dark.svg" alt="" />
            </p>
            <p>
              <i className="fa-solid fa-phone"></i>(+33) 1 39 60 98 82
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:pixecurity@pixecurity.com">
                pixecurity@pixecurity.com
              </a>
            </p>
            <p>
              <i className="fa-brands fa-linkedin"></i>
              <a href="https://www.linkedin.com/company/pixecurity/">
                Linkedin
              </a>
            </p>
            <p>
              <i className="fa-solid fa-location-dot"></i> 38 Rue Jean Mermoz
              78600 Maisons-Laffitte
            </p>
          </div>

          <div data-aos="flip-up" className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.3192053317075!2d2.1426642!3d48.9474075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e661bf4bc8b7a5%3A0x530ca1d69735aaaf!2sPixecurity!5e0!3m2!1sen!2sfr!4v1707475449842!5m2!1sen!2sfr"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div data-aos="flip-right" className={styles["contact-form"]}>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="lastname">Nom :</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              value={lastname}
              onChange={handleLastnameChange}
            />
            {lastnameError && (
              <span className={styles["error-message"]}>{lastnameError}</span>
            )}

            <label htmlFor="firstname">Prénom :</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              required
              value={firstname}
              onChange={handleFirstnameChange}
            />
            {firstnameError && (
              <span className={styles["error-message"]}>{firstnameError}</span>
            )}

            <label htmlFor="company">Entreprise (optionnel) :</label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={handleCompanyChange}
            />
            {companyError && (
              <span className={styles["error-message"]}>{companyError}</span>
            )}

            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <span className={styles["error-message"]}>{emailError}</span>
            )}

            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              value={message}
              onChange={handleMessageChange}
            />
            {messageError && (
              <span className={styles["error-message"]}>{messageError}</span>
            )}

            <input
              type="submit"
              value="Envoyer"
              className={styles.submitButton}
            />
          </form>
        </div>
      </div>
    </>
  );
}
export default Contact;
