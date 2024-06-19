import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/url';
import Swal from 'sweetalert2';
import styles from './style.module.scss';

const OrderConfirmation = () => {
  const router = useRouter();
  const { order_id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order_id) {
      checkPaymentStatus();
    }
  }, [order_id]);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${order_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const orderData = await response.json();

      if (orderData.payment.method === 'stripe' && !orderData.payment.paid) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds

        const paymentStatusResponse = await fetch(`${BASE_URL}/check-payment-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: order_id }),
        });

        if (!paymentStatusResponse.ok) {
          throw new Error('Failed to check payment status');
        }

        const paymentStatusData = await paymentStatusResponse.json();

        if (paymentStatusData.paid) {
          const updateResponse = await fetch(`${BASE_URL}/orders/${order_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...orderData,
              payment: { ...orderData.payment, paid: true },
              status: 'paid',
            }),
          });

          if (!updateResponse.ok) {
            throw new Error('Failed to update order status');
          }

          await fetch(`${BASE_URL}/users/${orderData.user}/reset-cart`, {
            method: 'PUT',
          });

          Swal.fire({
            icon: 'success',
            title: 'Paiement réussi',
            text: 'Votre commande a été payée avec succès et votre panier a été réinitialisé.',
          });
        }
      }

      setOrder(orderData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la vérification du statut de la commande',
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className={styles.orderConfirmation}>
      <h1>Confirmation de commande</h1>
      {order ? (
        <div>
          <p>Merci pour votre commande, {order.user.firstName} {order.user.lastName}.</p>
          <h2>Détails de la commande</h2>
          <p>ID de commande: {order._id}</p>
          <p>Date de commande: {new Date(order.orderDate).toLocaleDateString()}</p>
          <p>Montant total: {order.totalAmount} €</p>
          <h3>Articles commandés:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x {item.priceAtOrderTime} €
              </li>
            ))}
          </ul>
          <h3>Adresse de livraison:</h3>
          <p>{order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.zip}, {order.deliveryAddress.country}</p>
          <h3>Mode de livraison:</h3>
          <p>{order.delivery.method} - {order.delivery.fee} €</p>
        </div>
      ) : (
        <p>Commande introuvable</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
