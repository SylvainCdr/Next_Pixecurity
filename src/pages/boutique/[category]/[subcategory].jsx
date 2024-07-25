import React from 'react';
import Products from '@/templates/Shop/Products/Products'; // Assurez-vous que le chemin est correct
import { getProductsFiltered, getFiltersFromProducts } from '@/utils/getProductsFiltered';
import { getProductsByCatSubCat } from '@/api/products';

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
      subcategory,
      filters,
    },
  };
}

const Page = ({ products, category, subcategory, filters }) => {
  return (
    <Products
      products={products}
      category={category}
      subcategory={subcategory}
      filters={filters}
    />
  );
};

export default Page;
