import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import AdminCartModal from "@/Components/AdminCartModal/AdminCartModal";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";

export default function AdminCarts() {
  const [groupedByMonth, setGroupedByMonth] = useState({});
  const [selectedCart, setSelectedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchCarts(currentPage);
  }, [currentPage]);

  const fetchCarts = (page) => {
    fetch(`${BASE_URL}/carts?page=${page}&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        // Trier par date
        const sorted = data.carts.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );

        // Grouper par mois
        const grouped = {};
        sorted.forEach((group) => {
          const monthKey = new Date(
            group.carts[0]?.updated || Date.now()
          ).toLocaleString("fr-FR", {
            year: "numeric",
            month: "2-digit",
          });

          if (!grouped[monthKey]) {
            grouped[monthKey] = {
              totalAmount: 0,
              totalProducts: 0,
              totalCarts: 0,
              visitorEmails: {},
              carts: [],
            };
          }

          let monthTotal = 0;
          let monthProducts = 0;
          group.carts.forEach((cart) => {
            const price = cart.product?.price || 0;
            monthTotal += price * cart.quantity;
            monthProducts += cart.quantity;
          });

          grouped[monthKey].totalAmount += monthTotal;
          grouped[monthKey].totalProducts += monthProducts;
          grouped[monthKey].totalCarts += 1;
          grouped[monthKey].carts.push(group);

          if (group.visitorEmail) {
            grouped[monthKey].visitorEmails[group.visitorEmail] =
              (grouped[monthKey].visitorEmails[group.visitorEmail] || 0) + 1;
          }
        });

        setGroupedByMonth(grouped);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error);
  };

  const handleViewClick = (cart) => {
    setSelectedCart(cart);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCart(null);
  };

  const handleEditClick = (cart) => {
    router.push(`/admin/paniers/modification/${cart._id}`);
  };

  const handleDeleteClick = (cartId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce panier ?")) {
      fetch(`${BASE_URL}/carts/${cartId}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => fetchCarts(currentPage))
        .catch(console.error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1>Stats et détails des paniers par mois</h1>

      {Object.keys(groupedByMonth).length === 0 && (
        <p>Aucun panier à afficher</p>
      )}

      {Object.entries(groupedByMonth).map(([month, stats]) => (
        <div key={month} className={styles.monthBlock}>
          {/* Card résumé du mois */}
          <div className={styles.monthCard}>
            <h2>Mois : {month}</h2>
            <p>
              <strong>Paniers :</strong> {stats.totalCarts}
            </p>
            <p>
              <strong>Produits totaux :</strong> {stats.totalProducts}
            </p>
            <p>
              <strong>Montant total :</strong> {stats.totalAmount.toFixed(2)}€
            </p>
            {Object.keys(stats.visitorEmails).length > 0 && (
              <div className={styles.visitorList}>
                <strong>Visitor Emails :</strong>
                <ul>
                  {Object.entries(stats.visitorEmails).map(([email, count]) => (
                    <li key={email}>
                      {email} ({count})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Liste des paniers du mois */}
          <div className={styles.cartsList}>
            {stats.carts.map((group) => (
              <div key={group._id} className={styles.cartGroup}>
                <h3>
                  Client:{" "}
                  {group.user
                    ? `${group.user.firstName} ${group.user.lastName}`
                    : "Utilisateur inconnu"}{" "}
                  --------- Email visiteur:{" "}
                  {group.visitorEmail || "Email inconnu"}
                </h3>
                <h4></h4>

                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix HT</th>
                      <th>Total HT</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.carts.map((cart) => (
                      <tr key={cart._id}>
                        <td>{cart.product?.name || "Nom non défini"}</td>
                        <td>{cart.quantity}</td>
                        <td>
                          {cart.product?.price
                            ? `${cart.product.price}€`
                            : "Prix non défini"}
                        </td>
                        <td>
                          {cart.product?.price
                            ? `${(cart.product.price * cart.quantity).toFixed(2)}€`
                            : "Total non défini"}
                        </td>
                        <td>
                          {cart.updated
                            ? new Date(cart.updated).toLocaleDateString("fr-FR")
                            : "Date non définie"}
                        </td>
                        <td>
                          {/* <button onClick={() => handleEditClick(cart)} className={styles.modifyBtn}>Modifier</button> */}
                          <button
                            onClick={() => handleDeleteClick(cart._id)}
                            className={styles.deleteBtn}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
      {/* 
      {showModal && selectedCart && (
        <AdminCartModal
          cart={selectedCart}
          user={{ username: selectedCart.user ? `${selectedCart.user.firstName} ${selectedCart.user.lastName}` : "Utilisateur inconnu" }}
          contact={{ contact: selectedCart.user?.contact || "Contact inconnu" }}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
}
