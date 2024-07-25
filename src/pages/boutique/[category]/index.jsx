import { getProductsByCatSubCat } from "@/api/products";
import Products from "@/templates/Shop/Products/Products";
import {
  getProductsFiltered,
  getFiltersFromProducts,
} from "@/utils/getProductsFiltered";

export async function getServerSideProps({ params, query }) {
  const category = params.category || '';
  const subcategory = params.subcategory || '';
  const userId = query.userId || '';

  if (!category) {
    return { notFound: true };
  }

  const products = await getProductsByCatSubCat({ category, subcategory, userId });
  const productsFiltered = getProductsFiltered(products, query);
  const filters = getFiltersFromProducts(productsFiltered);

  return {
    props: {
      products: productsFiltered,
      category,
      subcategory, // Ajout de subcategory ici
      filters,
    },
  };
}

const Page = ({ products, category, subcategory, filters }) => {
  return (
    <Products
      products={products}
      category={category}
      subcategory={subcategory} // Ajout de subcategory ici
      filters={filters}
    />
  );
};

export default Page;
