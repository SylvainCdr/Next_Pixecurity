import styles from "./style.module.scss";

export default function AdminDiscountDetails({ closeModal, discount }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
        <h1 className={styles.title}>Détails de l'opération commerciale</h1>
        <div className={styles.discountDetails}>
          <p><span>Nom:</span> {discount.name}</p>
          <p><span>Description:</span> {discount.description}</p>
          <p><span>Code promo:</span> {discount.code}</p>
          <p><span>Type de remise:</span> {discount.discountType}</p>
          <p><span>Valeur (% ou €):</span> {discount.discountValue}</p>
          <p><span>Produits ciblés:</span> {discount.productNames.join(", ")}</p>
          <p><span>Utilisateurs ciblés:</span> {discount.userNames.join(", ")}</p>
          <p><span>Catégories ciblées:</span> {discount.targetedCategories.join(", ")}</p>
          <p><span>Sous-catégories ciblées:</span> {discount.targetedSubcategories.join(", ")}</p>
          <p><span>Marques ciblées:</span> {discount.targetedBrands.join(", ")}</p>
          <p><span>Date de début:</span> {new Date(discount.startDate).toLocaleDateString()}</p>
          <p><span>Date de fin:</span> {new Date(discount.endDate).toLocaleDateString()}</p>
          <p><span>Statut:</span> {discount.status}</p>
        </div>
      </div>
    </div>
  );
}
