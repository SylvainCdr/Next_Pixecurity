import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/url";
import Swal from "sweetalert2";
import styles from "./style.module.scss";
import AdminDiscountDetails from "@/Components/AdminDiscountDetails/AdminDiscountDetails";

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const openModal = async (discount) => {
    await fetchDiscountDetails(discount);
    setSelectedDiscount(discount);
  };

  const closeModal = () => {
    setSelectedDiscount(null);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    const response = await fetch(`${BASE_URL}/discounts`);
    const data = await response.json();
    data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    for (const discount of data) {
      await fetchDiscountDetails(discount);
    }
    setDiscounts(data);
    setLoading(false);
  };

  const fetchDiscountDetails = async (discount) => {
    // Fetch product names
    const productNames = await Promise.all(
      discount.products.map(async (productId) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await response.json();
        return data.name;
      })
    );

    // Fetch user names
    const userNames = await Promise.all(
      discount.targetedUsers.map(async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        const data = await response.json();
        return `${data.firstName} ${data.lastName} (${data.company})`;
      })
    );

    discount.productNames = productNames;
    discount.userNames = userNames;
  };

  const handleDeleteDiscount = async (discountId) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette opération commerciale ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${BASE_URL}/discount/${discountId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Opération commerciale supprimée avec succès",
          });
          fetchDiscounts();
        }
      }
    });
  };

  return (
    <div className={styles.adminDiscountsContainer}>
      <h1 className={styles.title}>Opérations commerciales</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.discountsTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type de remise</th>
              <th>Globale</th>
              <th>Valeur (%)</th>
              <th>Cible</th>
              <th>Validité</th>
              {/* <th>Statut</th> */}
              <th>Actions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => {
              const isValid =
                new Date(discount.startDate) <= new Date() &&
                new Date(discount.endDate) >= new Date();
              return (
                <tr key={discount._id}>
                  <td>{discount.name}</td>
                  <td>{discount.discountType}</td>
                  <td>{discount.isGlobalDiscount ? "Oui" : "Non"}</td>
                  <td>{discount.discountValue}</td>
                  <td>
                    {discount.userNames && discount.userNames.length > 0
                      ? discount.userNames.join(", ")
                      : "Tous les utilisateurs"}
                  </td>
                  <td style={{ color: isValid ? "green" : "red" }}>
                    {new Date(discount.startDate).toLocaleDateString()} au{" "}
                    {new Date(discount.endDate).toLocaleDateString()}
                  </td>
                  {/* <td>{discount.status}</td> */}
                  <td>
                    <button
                      className={styles.details}
                      onClick={() => openModal(discount)}
                    >
                      Détails
                    </button>
                  </td>
        
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => handleDeleteDiscount(discount._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {selectedDiscount && (
        <AdminDiscountDetails
          closeModal={closeModal}
          discount={selectedDiscount}
        />
      )}
    </div>
  );
}
