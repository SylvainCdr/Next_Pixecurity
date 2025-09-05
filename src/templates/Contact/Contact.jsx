import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import AOS from "aos";
import { BASE_URL } from "../../url";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";

function Contact() {
  const { t } = useTranslation();
  const [showMap, setShowMap] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [lastnameError, setLastnameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const isValidLastname = (name) => /^[a-zA-Z\s]{2,}$/.test(name);
  const isValidFirstname = (name) => /^[a-zA-Z\s]{2,}$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMessage = (message) => message.length >= 50;
  const isValidCompanyLength = (name) => name.length <= 30;
  // phone peut etre entre 10 ou 15 chiffre et on autorise le +
  const isValidPhone = (phone) => /^(\+?\d{10,15})$/.test(phone);

  const handleLastnameChange = (e) => {
    const value = e.target.value;
    setLastname(value);
    setLastnameError(isValidLastname(value) ? "" : t("contact.nameError"));
  };

  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);
    setFirstnameError(
      isValidFirstname(value) ? "" : t("contact.firstnameError")
    );
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    if (isValidCompanyLength(value)) {
      setCompany(value);
      setCompanyError("");
    } else {
      setCompanyError(t("contact.companyError"));
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(isValidPhone(value) ? "" : t("contact.phoneError"));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(isValidEmail(value) ? "" : t("contact.emailError"));
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setMessageError(isValidMessage(value) ? "" : t("contact.messageError"));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidLastname(lastname) ||
      !isValidFirstname(firstname) ||
      !isValidEmail(email) ||
      !isValidMessage(message) ||
      (company && !isValidCompanyLength(company)) ||
      (phone && !isValidPhone(phone))
    ) {
      Swal.fire({
        title: "Erreur",
        text: t("contact.validationError"),
        icon: "error",
        timer: 1800,
      });
      return;
    }

    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname,
        firstname,
        company,
        email,
        phone,
        message,
      }),
    });

    if (response.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: t("contact.success"),
        showConfirmButton: false,
        timer: 1800,
      });

      setLastname("");
      setFirstname("");
      setCompany("");
      setPhone("");
      setEmail("");
      setMessage("");
      setLastnameError("");
      setFirstnameError("");
      setCompanyError("");
      setPhoneError("");
      setEmailError("");
      setMessageError("");
    } else {
      Swal.fire({
        title: "Erreur",
        text: t("contact.error"),
        icon: "error",
        timer: 1800,
      });
    }
  };

useEffect(() => {
  if (window.innerWidth > 768) {
    import("aos").then((AOS) => AOS.init({ duration: 2300 }));
  }
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowMap(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("map-container");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{t("contact.title")} - Pixecurity</title>
        <meta name="description" content={t("contact.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="keywords"
          content="contact, nous contacter, projet, sécurité, solutions de sûreté, surveillance, Pixecurity, france, paris, vidéoprotection, contrôle d'accès, analyse d'image, hypervision, réseau, caméra, switch, bullet, ptz, dôme, bosch, vivotek, i-pro, zyxel, vms, milestone, til"
        />
        <meta name="author" content="Pixecurity" />
        {/* Autres balises meta spécifiques à cette page si nécessaire */}
      </Head>

      <div className={styles["contact-container"]}>
        <div className={styles["contact-section"]}>
          <div className={styles["visit-card"]}>
            <h2>{t("contact.title")}</h2>
            <h1>{t("contact.subtitle")}</h1>
            <h3>{t("contact.description")}</h3>

            <p>
              <Image
                src="/assets/logo-dark.svg"
                alt="Pixecurity Logo"
                width={200}
                height={80}
              />
              <p>
                {" "}
                <i className="fa-solid fa-building"></i>Pixecurity
              </p>
            </p>

            <p>
              <i className="fa-solid fa-phone"></i>
              {t("contact.phone")}
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>
              <Link href="mailto:pixecurity@pixecurity.com">
                pixecurity@pixecurity.com
              </Link>
            </p>
            <p>
              <i className="fa-brands fa-linkedin"></i>
              <Link href="https://www.linkedin.com/company/pixecurity/">
                {t("contact.linkedin")}
              </Link>
            </p>
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              {t("contact.address")}
            </p>
          </div>

          <div className={styles.map}>
            <div id="map-container" className={styles.map}>
              {showMap && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.3192053317075!2d2.1426642!3d48.9474075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e661bf4bc8b7a5%3A0x530ca1d69735aaaf!2sPixecurity!5e0!3m2!1sen!2sfr!4v1707475449842!5m2!1sen!2sfr"
                  width="600"
                  height="450"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </div>

        <div data-aos="flip-left" className={styles["contact-form"]}>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="lastname">{t("contact.name")}:</label>
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

            <label htmlFor="firstname">{t("contact.firstname")}:</label>
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

            <label htmlFor="company">{t("contact.company")}:</label>
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

            <label htmlFor="phone">{t("contact.phoneForm")}:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
            />
            {phoneError && (
              <span className={styles["error-message"]}>{phoneError}</span>
            )}

            <label htmlFor="email">{t("contact.email")}:</label>
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

            <label htmlFor="message">{t("contact.message")}:</label>
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
              value={t("contact.submit")}
              className={styles.submitButton}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
