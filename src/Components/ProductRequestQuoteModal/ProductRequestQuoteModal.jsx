import { useState } from "react";
import styles from "./style.module.scss";
import { BASE_URL } from "../../url";
import Swal from "sweetalert2";

export const ProductRequestQuoteModal = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleQuoteRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Préparez les données à envoyer
    const requestData = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      otherProducts: formData.get("otherProducts"),
      productRef: product.ref,
      productName: product.name,
      productPrice: product.price,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/request-quote-from-product-page`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Demande de devis envoyée",
          text: "Nous vous recontacterons dans les plus brefs délais.",
        });
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur lors de l'envoi de la demande",
        text: "Veuillez réessayer plus tard.",
      });
    }
  };

  return (
    <>
      <button
        className={styles["request-quote-button"]}
        onClick={() => setShowModal(true)}
      >
        Demander un devis <br />
        personnalisé
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <QuoteRequestForm onSubmit={handleQuoteRequest} />
        </Modal>
      )}
    </>
  );
};

function Modal({ children, onClose }) {
  return (
    <div
      className={styles["modal-overlay"]}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className={styles["modal-content"]}>
        <button
          className={styles["close-modal"]}
          onClick={onClose}
          aria-label="Fermer le modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function QuoteRequestForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h2 id="modal-title">Demande de devis rapide</h2>

      <h3>
        Veuillez remplir le formulaire ci-dessous pour recevoir un devis
        personnalisé concernant ce produit, ou pour toute autre demande sur
        plusieurs articles.
      </h3>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Nom et Prénom</label>
        <input type="text" name="name" id="name" required />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="company">Entreprise (optionnel)</label>
        <input type="text" name="company" id="company" />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="otherProducts">
          Autres produits ou références souhaités (optionnel)
        </label>
        <textarea
          name="otherProducts"
          id="otherProducts"
          rows="4"
          placeholder="Ex. : Caméras PTZ, Switch 24 ports, Licence VMS..."
        ></textarea>
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Envoyer ma demande
      </button>
    </form>
  );
}
