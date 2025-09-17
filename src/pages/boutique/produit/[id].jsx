// src/pages/boutique/produit/[id].jsx

import {
  getProductById,
  getProductsByCatSubCat,
  getProductsBySlug,
} from "@/api/products";
import Product from "@/templates/Shop/Product/Product";

export async function getServerSideProps({ params, query }) {
  const id = params.id;
  const userId = query.userId || "";

  // Récupération du produit en question
  const product = await getProductById(id, userId);

  if (!product) {
    return { notFound: true };
  }

  // Récupération des produits de la même catégorie et sous-catégorie
  const products = await getProductsBySlug({
    slugBrand: product.slugBrand,
    slugCategory: product.slugCategory,
    slugSubcategory: product.slugSubcategory,
    userId,
  });

  // Filtrer pour exclure le produit actuel et limiter à 8 suggestions
  const suggestions = products
    .filter((item) => String(item._id) !== String(product._id))
    .slice(0, 8);

  return {
    props: {
      product,
      id,
      suggestions,
      userId,
    },
  };
}

export default function Page({ product, id, suggestions, userId }) {
  return (
    <Product
      product={product}
      id={id}
      suggestions={suggestions}
      userId={userId}
    />
  );
}
