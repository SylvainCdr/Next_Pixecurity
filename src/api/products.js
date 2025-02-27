import { BASE_URL } from "@/url";

export async function getProductsByCatSubCat({
  brand,
  category,
  subcategory,
  userId = "",
}) {
  const apiUrl = subcategory
    ? `${BASE_URL}/products?brand=${encodeURIComponent(brand)}&products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&userId=${userId}`
    : `${BASE_URL}/products?brand=${encodeURIComponent(brand)}&products?category=${encodeURIComponent(category)}&userId=${userId}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// export async function getProducts(userId = "") {
//   const response = await fetch(
//     `${BASE_URL}/products${userId ? `?userId=${userId}` : ""}`
//   );
//   const data = await response.json();
//   return data;
// }

// export async function getProducts(userId = "") {
//   try {
//     const apiUrl = `${BASE_URL}/products${userId ? `?userId=${userId}` : ""}`;
//     console.log("Fetching:", apiUrl);

//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP Error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

export async function getProducts(
  userId = "",
  brand = "",
  limit = 50,
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
