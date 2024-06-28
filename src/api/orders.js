import { BASE_URL } from "@/url";

export async function createOrder({ userId, cartId }) {
  const orderResponse = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      cartId,
    }),
  });

  if (!orderResponse.ok) throw new Error(orderResponse);

  return orderResponse.json();
}

export async function updateOrderDelivery(orderId, order) {
  const orderResponse = await fetch(`${BASE_URL}/orders/${orderId}/delivery`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });

  if (!orderResponse.ok) throw new Error(orderResponse);

  return orderResponse.json();
}

export async function getOrderById(orderId) {
  const orderResponse = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!orderResponse.ok) throw new Error(orderResponse);

  return orderResponse.json();
}
