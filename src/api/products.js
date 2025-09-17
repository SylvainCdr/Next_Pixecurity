import { BASE_URL } from "@/url";

export async function getProductsByCatSubCat({
  userId = "",
  brand = "",
  category = "",
  subcategory = "",
  excludeId = null, // ID du produit à exclure
}) {
  // Construire l'URL en ajoutant uniquement ce qui existe
  let apiUrl = `${BASE_URL}/products?categorySlug=${encodeURIComponent(category)}`;
  if (subcategory)
    apiUrl += `&subcategorySlug=${encodeURIComponent(subcategory)}`;
  if (brand) apiUrl += `&brandSlug=${encodeURIComponent(brand)}`;

  if (userId) apiUrl += `&userId=${userId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(
        "Erreur fetch getProductsByCatSubCat:",
        apiUrl,
        response.status
      );
      return [];
    }

    let data = await response.json();

    // Exclure le produit actuel si nécessaire
    if (excludeId) {
      data = data.filter((item) => String(item._id) !== String(excludeId));
    }

    return data;
  } catch (error) {
    console.error("Erreur getProductsByCatSubCat:", error);
    return [];
  }
}

export async function getProductsBySlug({
  slugBrand,
  slugCategory,
  slugSubcategory,
  userId,
}) {
  const apiUrl = slugSubcategory
    ? `${BASE_URL}/products?slugBrand=${encodeURIComponent(slugBrand)}&slugCategory=${encodeURIComponent(slugCategory)}&slugSubcategory=${encodeURIComponent(slugSubcategory)}&userId=${userId}`
    : `${BASE_URL}/products?slugBrand=${encodeURIComponent(slugBrand)}&slugCategory=${encodeURIComponent(slugCategory)}&userId=${userId}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error("Erreur fetch getProductsBySlug:", apiUrl, response.status);
    return [];
  }
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
