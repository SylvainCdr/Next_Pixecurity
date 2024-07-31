import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminCartModal from "@/Components/AdminCartModal/AdminCartModal";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";

export default function AdminCarts() {
  const [groupedCarts, setGroupedCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchCarts(currentPage);
  }, [currentPage]);

  const fetchCarts = (page) => {
    fetch(`${BASE_URL}/carts?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched carts data:", data);
        const sortedCarts = data.carts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        setGroupedCarts(sortedCarts);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });
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
      fetch(`${BASE_URL}/carts/${cartId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          // Réactualiser la liste des paniers après suppression
          fetchCarts(currentPage);
        })
        .catch((error) => {
          console.error("Error deleting cart:", error);
        });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles["adminCarts-container"]}>
      <h1>Paniers en cours</h1>
      <div className={styles["carts-list"]}>
        {groupedCarts.length > 0 ? (
          groupedCarts.map((group) => (
            <div key={group._id}>
              <h2>
                Client:{" "}
                {group.user
                  ? `${group.user.firstName} ${group.user.lastName}`
                  : "Utilisateur inconnu"}
              </h2>
              <h3>Produits du panier {group._id}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th>Total</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.carts && group.carts.length > 0 ? (
                    group.carts.map((cart) => (
                      <tr key={cart._id}>
                        <td>{cart.product?.name || "Nom non défini"}</td>
                        <td>{cart.quantity || 0}</td>
                        <td>{cart.product?.price ? `${cart.product.price}€` : "Prix non défini"}</td>
                        <td>
                          {cart.product?.price ? `${(cart.product.price * cart.quantity).toFixed(2)}€` : "Total non défini"}
                        </td>
                        <td>{cart.updated ? new Date(cart.updated).toLocaleDateString("fr-FR") : "Date non définie"}</td>
                        <td>
                          <button onClick={() => handleEditClick(cart)}>Modifier</button>
                          <button onClick={() => handleDeleteClick(cart._id)}>Supprimer</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Aucun produit dans ce panier</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>Aucun panier à afficher</p>
        )}
      </div>
      <div className={styles["pagination"]}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>{`Page ${currentPage} sur ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
      {showModal && selectedCart && (
        <AdminCartModal
          cart={selectedCart}
          user={{
            username: selectedCart.user
              ? `${selectedCart.user.firstName} ${selectedCart.user.lastName}`
              : "Utilisateur inconnu",
          }}
          contact={{
            contact: selectedCart.user?.contact || "Contact inconnu",
          }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
