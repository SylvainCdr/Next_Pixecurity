import { BASE_URL } from "@/url";

export async function getProductsByCatSubCat({
  category,
  subcategory,
  userId = "",
}) {
  const apiUrl = subcategory
    ? `${BASE_URL}/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&userId=${userId}`
    : `${BASE_URL}/products?category=${encodeURIComponent(category)}&userId=${userId}`;

  const response = await fetch(`${apiUrl}`);
  const data = await response.json();
  return data;
}

export async function getProducts(userId = "") {
  const response = await fetch(
    `${BASE_URL}/products${userId ? `?userId=${userId}` : ""}`
  );
  const data = await response.json();
  return data;
}

export async function getProductById(id, userId = "") {
  const response = await fetch(
    `${BASE_URL}/products/${id}${userId ? `?userId=${userId}` : ""}`
  );
  const data = await response.json();
  return data;
}

