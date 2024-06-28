import { getProducts } from "@/api/products";
import Catalogue from "@/templates/Shop/Main/Main";

export async function getServerSideProps({ query }) {
  const userId = query.userId;
  const products = await getProducts(userId);

  return {
    props: {
      products,
    },
  };
}

export default function Page({ products }) {
  return <Catalogue products={products} />;
}
