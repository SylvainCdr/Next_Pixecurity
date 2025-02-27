import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";
import { PropagateLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";
import { useGetUser } from "@/Components/useGetUser";
import useFavorites from "@/Components/useFavorites";
import { useCartContext } from "@/Components/cartContext";

const color = "#ff9c3fc0";

const Products = ({ products, category, subcategory, filters }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);

  const user = useGetUser();
  const userId = user?._id;
  const discount = user?.discount || 0;

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 1 });

  // Fonction de calcul du prix avec remise
  const calculateDiscount = (price) => price - (price * discount) / 100;

  // Trier les produits par ordre alphabétique
  const sortedProducts = [...products].sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  // Gérer les résultats de la recherche
  const handleSearchResults = (results) => {
    setDisplayedProducts(results.slice(0, 20));
  };

  // Charger les produits par lots
  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setTimeout(() => {
        const nextProducts = sortedProducts.slice(
          displayedProducts.length,
          displayedProducts.length + 8
        );

        setDisplayedProducts((prev) => [...prev, ...nextProducts]);
        setHasMore(displayedProducts.length + nextProducts.length < products.length);
        setLoading(false);
      }, 1000);
    }
  };

  // Observer le bas de page pour charger plus de produits
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreProducts();
    }
  }, [inView, hasMore]);

  // Mise à jour lors du changement de catégorie/sous-catégorie
  useEffect(() => {
    setIsSubcategoryLoading(true);
    setDisplayedProducts(sortedProducts.slice(0, 20));
    setHasMore(products.length > 20);
    setIsSubcategoryLoading(false);
  }, [category, subcategory, filters, products]);

  return (
    <div className={styles["products-container"]}>
      <Head>
        <title>Produits</title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique."
        />
      </Head>

      <RegisterPopup />
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
           discountedPrice={calculateDiscount(product.price, discount)} // Assure-toi que le discount est bien appliqué ici
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

      <div ref={ref} className={styles.ref} style={{ height: "6rem" }}>
        {loading && <PropagateLoader color={color} loading={true} size={20} />}
      </div>
    </div>
  );
};

export default Products;
