import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminCartModal from "@/Components/AdminCartModal/AdminCartModal";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";

export default function AdminCarts() {
  const [groupedCarts, setGroupedCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Fetch all carts from the server
  useEffect(() => {
    fetch(`${BASE_URL}/carts`)
      .then((response) => response.json())
      .then((data) => {
        setGroupedCarts(data);
      })
      .catch((error) => {
        console.error("Error fetching carts:", error);
      });
  }, []);

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

  return (
    <div className={styles["adminCarts-container"]}>
      <h1>Paniers en cours</h1>
      <div className={styles["carts-list"]}>
        <table>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>Client</th>
              <th>Produit(s)</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Total</th>
              <th>Updated</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groupedCarts.map((group) =>
              group.carts.map((cart) => (
                <tr key={cart._id}>
                  <td>{group._id}</td>
                  <td>{cart.user ? `${cart.user.firstName} ${cart.user.lastName}` : "Utilisateur inconnu"}</td>
                  <td>{cart.name}</td>
                  <td>{cart.quantity}</td>
                  <td>{cart.price}€</td>
                  <td>{cart.price * cart.quantity}€</td>
                  <td>{new Date(cart.updated).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <button onClick={() => handleViewClick(cart)}>Voir</button>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(cart)} className={styles["modify-btn"]}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <AdminCartModal
          cart={selectedCart}
          user={{ username: selectedCart.user ? `${selectedCart.user.firstName} ${selectedCart.user.lastName}` : "Utilisateur inconnu" }}
          contact={{ contact: selectedCart.user ? selectedCart.user.contact : "Contact inconnu" }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
