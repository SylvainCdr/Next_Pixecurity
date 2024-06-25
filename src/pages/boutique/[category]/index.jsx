import { getProductsByCatSubCat } from "@/utils/api/products";
import Products from "@/templates/Shop/Products/Products";
import {
  getProductsFiltered,
  getFiltersFromProducts,
} from "@/utils/getProductsFiltered";

export async function getServerSideProps({ params, query }) {
  const category = params.category;
  const products = await getProductsByCatSubCat({ category });
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
