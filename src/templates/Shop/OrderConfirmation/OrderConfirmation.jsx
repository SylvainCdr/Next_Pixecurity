import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/url";
import Swal from "sweetalert2";
import styles from "./style.module.scss";

const OrderConfirmation = () => {
  const router = useRouter();
  const { order_id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order_id) {
      const checkPaymentStatus = async () => {
        try {
          const updateResponse = await fetch(
            `${BASE_URL}/orders/${order_id}/success`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update order status");
          }

          localStorage.removeItem("cartId");

          const orderData = await updateResponse.json();
          setOrder(orderData);

          Swal.fire({
            icon: "success",
            title: "Paiement réussi",
            text: "Votre commande a été payée avec succès. Un email de confirmation vous a été envoyé",
          });
        } catch (err) {
          console.error({ err });
          setError(err.message);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de la vérification du statut de la commande",
          });
        } finally {
          setLoading(false);
        }
      };

      checkPaymentStatus();
    }
  }, [order_id]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>Erreur: {error}</div>;

  return (
    <div className={styles.orderConfirmation}>
      <h1>Confirmation de commande</h1>
      {order ? (
        <div className={styles.orderDetails}>
          <p className={styles.thank}>
            Merci pour votre commande chez Pixecurity !{" "}
          </p>
          <p>
            Date de commande: {new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>Montant total TTC: {order.totalAmount.toFixed(2)} €</p>
          <h3>Articles commandés :</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x {item.priceAtOrderTime} € ht
              </li>
            ))}
          </ul>
          <h3> Adresse de facturation :</h3>
          <p>
            {order.billingAddress.street}, {order.billingAddress.city},{" "}
            {order.billingAddress.zip}, {order.billingAddress.country}
          </p>
          <h3>Adresse de livraison :</h3>
          <p>
            {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
            {order.deliveryAddress.zip}, {order.deliveryAddress.country}
          </p>
          <h3>Mode de livraison :</h3>
          <p>
            {order.delivery.method} - {order.delivery.fee} €
          </p>
          <div className={styles.bottomText}>
            <p> Un email de confirmation vous a été envoyé par mail.</p>
            <p>
              Vous pouvez consulter les détails de commande depuis 'Mon compte'.{" "}
            </p>
          </div>
        </div>
      ) : (
        <p>Commande introuvable</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
