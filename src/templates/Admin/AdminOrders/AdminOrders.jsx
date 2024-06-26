import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminOrderModal from "@/Components/AdminOrderModal/AdminOrderModal";
import Link from "next/link";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/allOrders`)
      .then((response) => response.json())
      .then((data) => {
        // Trier les commandes par date de commande, de la plus récente à la plus ancienne
        const sortedOrders = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
      });
  }, []);

  useEffect(() => {
    const userIds = orders.map((order) => order.user);
    userIds.forEach((userId) => {
      fetch(`${BASE_URL}/users/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: userData,
          }));
        });
    });
  }, [orders]);

  // UseEffect pour supprimer une commande 
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.message) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        Swal.fire({
          icon: "success",
          title: "Supprimée!",
          text: "La commande a été supprimée avec succès.",
        });
      } else {
        console.error("Error deleting order:", data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Fonction pour afficher une alerte de confirmation avant de supprimer
  const confirmDeleteOrder = (orderId) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Voulez-vous vraiment supprimer cette commande?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Non, annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOrder(orderId);
      }
    });
  };

  // Au clic sur "Détails", on met à jour l'ID de la commande sélectionnée
  const handleDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };

//   model :
  
// // Création d'un schéma pour les commandes
// const OrderSchema = new Schema({
//   // Création d'une référence à l'utilisateur qui a passé la commande
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   // Création d'un objet pour stocker l'adresse de livraison
//   deliveryAddress: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     zip: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   // Création d'un objet pour stocker les produits commandés
//   items: [{
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     name: { type: String, required: true },
//     ref : { type: String, required: true },
//     quantity: { type: Number, required: true },
//     priceAtOrderTime: { type: Number, required: true },
//   }],
//   delivery: {
//     method: { type: String, required: true, enum: ['dhl', 'chronopost'] },
//     fee: { type: Number, default: 0 },
//   },
//   // Création d'une date de commande
//   orderDate: {
//     type: Date,
//     default: Date.now

//   },
//   // Création d'un statut pour la commande
//   status: {
//     type: String,
//     enum: ['pending', 'shipped', 'delivered'],
//     default: 'pending'
//   },
//   payment: {
//     method: { type: String, required: true },
//     paid: { type: Boolean, default: false },
//   },
//   // Création d'un total pour la commande
//     totalAmount: { type: Number, required: true },
// });

  return (
    <div className={styles["admin-orders"]}>
      <h1>Commandes</h1>

      {/* Si aucune commande n'est trouvée, on affiche un message */}
      {orders.length === 0 && <p>Aucune commande trouvée</p>}

      {/* Tableau des commandes */}
      <table>
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Date</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Payée</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.orderDate &&
                  new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td>
                {users[order.user]?.company} ({users[order.user]?.lastName}{" "}
                {users[order.user]?.firstName})
              </td>
              <td>{order.totalAmount.toFixed(2)} €</td>
              <td>{order.payment.paid ? "Oui" : "Non"}</td>
              <td>{order.status}</td>
              <td>
                {/* Au clic sur "Détails", on appelle la fonction handleDetails avec l'ID de la commande */}
                <button onClick={() => handleDetails(order._id)}>
                  Détails
                </button>
                <Link href={`/admin/commandes/modification/${order._id}`}>
                  <button className={styles["modify-btn"]}>Modifier</button>
                </Link>
                <button className={styles["delete-btn"]}onClick={() => confirmDeleteOrder(order._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Le modal s'affiche seulement si selectedOrderId est défini */}
      {selectedOrderId && (
        <AdminOrderModal
          order={orders.find((order) => order._id === selectedOrderId)}
          user={users[selectedOrderId]}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
