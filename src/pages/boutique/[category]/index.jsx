import { getProductsByCatSubCat } from "@/api/products";
import Products from "@/templates/Shop/Products/Products";
import {
  getProductsFiltered,
  getFiltersFromProducts,
} from "@/utils/getProductsFiltered";

export async function getServerSideProps({ params, query }) {
  const category = params.category;
  const userId = query.userId;
  const products = await getProductsByCatSubCat({ category, userId });
  const productsFiltered = getProductsFiltered(products, query);
  const filters = getFiltersFromProducts(productsFiltered);

  return {
    props: {
      products: productsFiltered,
      category,
      filters,
    },
  };
}

export default function Page({ products, category, filters }) {
  return <Products products={products} category={category} filters={filters} />;
}
