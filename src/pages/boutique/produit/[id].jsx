import { getProductById, getProducts } from "@/api/products";
import Product from "@/templates/Shop/Product/Product";

export async function getServerSideProps({ params, query }) {
  const id = params.id;
  const userId = query.userId;
  const product = await getProductById(id, userId );
  const products = await getProducts(userId);
  
  const suggestions = products
    .filter(
      (item) =>
        item.subcategory === product.subcategory && item.brand === product.brand
    )
    .slice(0, 4);

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
  return <Product product={product} id={id} suggestions={suggestions} userId={userId} />;
}
