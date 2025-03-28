import { BASE_URL } from "@/url";

export async function getProductsByCatSubCat({
  userId = "",
  brand,
  category,
  subcategory,
}) {
  const apiUrl = subcategory
    ? `${BASE_URL}/products?brand=${encodeURIComponent(brand)}&category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&userId=${userId}`
    : `${BASE_URL}/products?brand=${encodeURIComponent(brand)}&category=${encodeURIComponent(category)}&userId=${userId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

export async function getProducts(
  userId = "",
  brand = "",
  limit = "150",
  category = ""
) {
  try {
    let apiUrl = `${BASE_URL}/products?limit=${limit}`;

    if (userId) apiUrl += `&userId=${userId}`;
    if (brand) apiUrl += `&brand=${encodeURIComponent(brand)}`;
    if (category) apiUrl += `&category=${encodeURIComponent(category)}`;

    console.log("Fetching:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id, userId = "") {
  const response = await fetch(
    `${BASE_URL}/products/${id}${userId ? `?userId=${userId}` : ""}`
  );
  const data = await response.json();
  return data;
}

// router.get("/products/all", getAllProducts);
export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products/all`);
  const data = await response.json();
  return data;
}

