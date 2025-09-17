import React from "react";
import Products from "@/templates/Shop/Products/Products";
import {
  getProductsFiltered,
  getFiltersFromProducts,
} from "@/utils/getProductsFiltered";
import { getProductsBySlug } from "@/api/products"; // <- on utilise getProductsBySlug

export async function getServerSideProps({ params, query }) {
  const brandSlug = params.brandSlug || "";
  const categorySlug = params.categorySlug || "";
  const subcategorySlug = params.subcategorySlug || "";
  const userId = query.userId || "";

  if (!categorySlug) {
    return { notFound: true };
  }

  const products = await getProductsBySlug({
    slugBrand: brandSlug,
    slugCategory: categorySlug,
    slugSubcategory: subcategorySlug,
    userId,
  });

  if (!products || products.length === 0) {
    return { notFound: true };
  }

  const productsFiltered = getProductsFiltered(products, query);
  const filters = getFiltersFromProducts(productsFiltered);

  return {
    props: {
      products: productsFiltered,
      brandSlug,
      categorySlug,
      subcategorySlug,
      filters,
    },
  };
}

const Page = ({
  products,
  brandSlug,
  categorySlug,
  subcategorySlug,
  filters,
}) => {
  return (
    <Products
      products={products}
      brand={brandSlug}
      category={categorySlug}
      subcategory={subcategorySlug}
      filters={filters}
    />
  );
};

export default Page;
