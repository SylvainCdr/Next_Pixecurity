import { getProductById, getProductsByCatSubCat } from "@/api/products";
import Product from "@/templates/Shop/Product/Product";

export async function getServerSideProps({ params, query }) {
  const id = params.id;
  const userId = query.userId || "";

  // Récupération du produit en question
  const product = await getProductById(id, userId);

  if (!product) {
    return {
      notFound: true, // Gérer le cas où le produit n'existe pas
    };
  }

  // Récupération des produits de la même catégorie et sous-catégorie
  const products = await getProductsByCatSubCat({
    userId,
    brand: product.brand,
    category: product.category,
    subcategory: product.subcategory,
  });

  // Filtrer pour exclure le produit actuel et limiter à 4 suggestions
  const suggestions = products
  .filter((item) => String(item._id) !== String(product._id)) // Vérification stricte avec _id
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
