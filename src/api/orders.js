import { BASE_URL } from "@/url";

export async function createOrder({
  userId,
  cartId,
  shippingCost,
  shippingMethod,
}) {
  try {
    // Vérifiez si shippingCost est un nombre valide
    if (isNaN(parseFloat(shippingCost))) {
      throw new Error("Shipping cost is not a valid number.");
    }

    const orderResponse = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        cartId,
        shippingCost,
        shippingMethod,
      }),
    });

    if (!orderResponse.ok) {
      const errorMessage = await orderResponse.text();
      throw new Error(
        `Failed to create order. Status: ${orderResponse.status}, Message: ${errorMessage}`
      );
    }

    return orderResponse.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Rethrow the error to propagate it further
  }
}

export async function updateOrderDelivery(orderId, order) {
  const orderResponse = await fetch(`${BASE_URL}/orders/${orderId}/delivery`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });

  if (!orderResponse.ok) {
    const errorMessage = await orderResponse.text();
    throw new Error(
      `HTTP error! status: ${orderResponse.status}, message: ${errorMessage}`
    );
  }

  return orderResponse.json();
}

export async function getOrderById(orderId) {
  const orderResponse = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!orderResponse.ok) {
    const errorMessage = await orderResponse.text();
    throw new Error(
      `HTTP error! status: ${orderResponse.status}, message: ${errorMessage}`
    );
  }

  return orderResponse.json();
}
