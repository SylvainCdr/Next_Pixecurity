// import { getProductsByCatSubCat } from "@/api/products";
// import Products from "@/templates/Shop/Products/Products";
// import {
//   getProductsFiltered,
//   getFiltersFromProducts,
// } from "@/utils/getProductsFiltered";

// export async function getServerSideProps({ params, query }) {
//   const brand = params.brand || "";
//   const category = params.category || "";
//   const subcategory = params.subcategory || "";
//   const userId = query.userId || "";

//   if (!category) {
//     return { notFound: true };
//   }

//   const products = await getProductsByCatSubCat({
//     brand,
//     category,
//     subcategory,
//     userId,
//   });
//   const productsFiltered = getProductsFiltered(products, query);
//   const filters = getFiltersFromProducts(productsFiltered);

//   return {
//     props: {
//       products: productsFiltered,
//       brand,
//       category,
//       subcategory,
//       filters,
//     },
//   };
// }

// const Page = ({ products, brand, category, subcategory, filters }) => {
//   return (
//     <Products
//       products={products}
//       brand={brand}
//       category={category}
//       subcategory={subcategory}
//       filters={filters}
//     />
//   );
// };

// export default Page;
