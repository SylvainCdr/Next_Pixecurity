import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";
import { PropagateLoader } from "react-spinners";
import { useState, useEffect } from "react";
import Head from "next/head";
// import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";
import { useGetUser } from "@/Components/useGetUser";
import useFavorites from "@/Components/useFavorites";
import { useCartContext } from "@/Components/cartContext";
import { useRouter } from "next/router";

const color = "#ff9c3fc0";

const Products = ({ brand, products, category, subcategory, filters }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const user = useGetUser();
  const userId = user?._id;
  const discount = user?.discount || 0;

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();

  useEffect(() => {
    setIsLoadingProducts(true);
    setIsSubcategoryLoading(true);

    setTimeout(() => {
      setDisplayedProducts(sortedProducts); // On affiche directement tous les produits triés
      setIsLoadingProducts(false);
      setIsSubcategoryLoading(false);
    }, 1000);
  }, [category, subcategory, filters, products, brand]);

  // Fonction de calcul du prix avec remise
  const calculateDiscount = (price) => price - (price * discount) / 100;

  // Trier les produits par ordre alphabétique
  const sortedProducts = [...products].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  // Gérer les résultats de la recherche
  const handleSearchResults = (results) => {
    setDisplayedProducts(results);
  };

  const router = useRouter();
  const pageDescription = `Découvrez notre sélection de produits ${category} / ${subcategory} de la marque ${brand}`;

  return (
    <div className={styles["products-container"]}>
   <Head>
  <title>{`${brand} / ${category} / ${subcategory} - Pixecurity`}</title>
  <meta name="description" content={pageDescription} />

  {/* Canonical URL */}
  <link rel="canonical" href={`https://www.pixecurity.com${router.asPath}`} />

  {/* Open Graph tags */}
  <meta property="og:title" content={`${brand} / ${category} / ${subcategory} - Pixecurity`} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content={`https://www.pixecurity.com${router.asPath}`} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://uploads.pixecurity.com/files/fav-pix-shop_1.png" /> 

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${brand} / ${category} / ${subcategory} - Pixecurity`} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content="https://uploads.pixecurity.com/files/fav-pix-shop_1.png" /> 
</Head>

      {/* <RegisterPopup /> */}
      <ShopNav setIsSubcategoryLoading={setIsSubcategoryLoading} />
      <ShopSearch isHero={false} onSearchResults={handleSearchResults} />

      {isSubcategoryLoading && (
        <div className={styles["sweet-loading"]}>
          <PropagateLoader color={color} loading={true} size={20} />
        </div>
      )}

      {!isSubcategoryLoading && (
        <div className={styles["aside-products"]}>
          <ShopAside subcategory={subcategory} category={category} filters={filters} />
          <div className={styles["products-grid"]}>
            {displayedProducts.map((product) => (
              <div key={product._id}>
                <ProductCard
                  product={product}
                  discountedPrice={calculateDiscount(product.price)}
                  userId={userId}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  checkFavorite={checkFavorite}
                  addToCart={addToCart}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;


// ANCIENNE LOGIQUE AVEC LE LOAD MORE :


// import ShopNav from "@/Components/ShopNav/ShopNav";
// import ShopSearch from "@/Components/ShopSearch/ShopSearch";
// import ProductCard from "@/Components/ProductCard/ProductCard";
// import ShopAside from "@/Components/ShopAside/ShopAside";
// import styles from "./style.module.scss";
// import { PropagateLoader } from "react-spinners";
// import { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import Head from "next/head";
// import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";
// import { useGetUser } from "@/Components/useGetUser";
// import useFavorites from "@/Components/useFavorites";
// import { useCartContext } from "@/Components/cartContext";
// import { useRouter } from "next/router";

// const color = "#ff9c3fc0";

// const Products = ({ brand, products, category, subcategory, filters }) => {
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(false);
//   const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true); // Ajoute cet état
//   const user = useGetUser();
//   const userId = user?._id;
//   const discount = user?.discount || 0;

//   const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
//   const { addToCart } = useCartContext();
//   const { ref, inView } = useInView({ triggerOnce: false, threshold: 1 });

//   useEffect(() => {
//     setIsLoadingProducts(true); // Active le loader avant de mettre à jour les produits
//     setIsSubcategoryLoading(true);

//     setTimeout(() => {
//       // Simule le chargement des données
//       setDisplayedProducts(sortedProducts.slice(0, 20));
//       setHasMore(products.length > 20);
//       setIsLoadingProducts(false); // Désactive le loader une fois les produits chargés
//       setIsSubcategoryLoading(false);
//     }, 1000); // Tu peux ajuster ce délai en fonction de l'API
//   }, [category, subcategory, filters, products, brand]);

//   // Fonction de calcul du prix avec remise
//   const calculateDiscount = (price) => price - (price * discount) / 100;

//   // Trier les produits par ordre alphabétique
//   const sortedProducts = [...products].sort((a, b) =>
//     a.name.toLowerCase().localeCompare(b.name.toLowerCase())
//   );

//   // Gérer les résultats de la recherche
//   const handleSearchResults = (results) => {
//     setDisplayedProducts(results.slice(0, 20));
//   };

//   // Charger les produits par lots
//   const loadMoreProducts = () => {
//     if (!loading && hasMore) {
//       setLoading(true);
//       setTimeout(() => {
//         const nextProducts = sortedProducts.slice(
//           displayedProducts.length,
//           displayedProducts.length + 8
//         );

//         setDisplayedProducts((prev) => [...prev, ...nextProducts]);
//         setHasMore(
//           displayedProducts.length + nextProducts.length < products.length
//         );
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   // Observer le bas de page pour charger plus de produits
//   useEffect(() => {
//     if (inView && hasMore) {
//       loadMoreProducts();
//     }
//   }, [inView, hasMore]);

//   const router = useRouter();

//   const pageDescription = `Découvrez notre sélection de produits ${category} / ${subcategory} de la marque ${brand}`;

//   return (
//     <div className={styles["products-container"]}>
//       <Head>
//         <title>{`${brand} /  ${category} / ${subcategory} - Pixecurity`}</title>
//         <meta name="description" content={pageDescription} />
//         <meta
//           property="og:title"
//           content={`${brand} /  ${category} / ${subcategory} - Pixecurity`}
//         />
//         <meta property="og:description" content={pageDescription} />
//         <meta
//           property="og:url"
//           content={`https://www.pixecurity.com${router.asPath}`}
//         />
//         <meta property="og:type" content="website" />
//       </Head>

//       <RegisterPopup />
//       <ShopNav setIsSubcategoryLoading={setIsSubcategoryLoading} />
//       <ShopSearch isHero={false} onSearchResults={handleSearchResults} />

//       {isSubcategoryLoading && (
//         <div className={styles["sweet-loading"]}>
//           <PropagateLoader color={color} loading={true} size={20} />
//         </div>
//       )}

//       {!isSubcategoryLoading && (
//         <div className={styles["aside-products"]}>
//           <ShopAside
//             subcategory={subcategory}
//             category={category}
//             filters={filters}
//           />
//           <div className={styles["products-grid"]}>
//             {displayedProducts.map((product) => (
//               <div key={product._id}>
//                 <ProductCard
//                   product={product}
//                   discountedPrice={calculateDiscount(product.price, discount)} // Assure-toi que le discount est bien appliqué ici
//                   userId={userId}
//                   addToFavorites={addToFavorites}
//                   removeFromFavorites={removeFromFavorites}
//                   checkFavorite={checkFavorite}
//                   addToCart={addToCart}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div ref={ref} className={styles.ref} style={{ height: "6rem" }}>
//         {loading && <PropagateLoader color={color} loading={true} size={20} />}
//       </div>
//     </div>
//   );
// };

// export default Products;
