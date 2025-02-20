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

const color = "#ff9c3fc0";
const override = {
  size: "15px",
  margin: "0 auto",
  borderColor: "red",
};

const Products = ({ products, category, subcategory, filters }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false); // Gérer l'état de chargement des catégories

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  const sortedProducts = products.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setDisplayedProducts(results.slice(0, 20));
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setLoading(true);
      const nextProducts = products.slice(
        displayedProducts.length,
        displayedProducts.length + 8
      );

      if (nextProducts.length > 0) {
        setTimeout(() => {
          setDisplayedProducts((prev) => [...prev, ...nextProducts]);
          setLoading(false);
        }, 1000);
      } else {
        setHasMore(false);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  useEffect(() => {
    setIsCategoryLoading(true);

    // Réinitialiser displayedProducts lors du changement de catégorie
    setDisplayedProducts(products.slice(0, 20));

    setIsCategoryLoading(false);
  }, [category, subcategory, filters, products]);

  return (
    <div className={styles["products-container"]}>
      <Head>
        <title>Produits</title>
        <meta
          name="description"
          content="Découvrez notre catalogue de produits chez Pixecurity Boutique. Nous offrons des caméras de surveillance, des équipements réseau, des logiciels et plus encore pour répondre à vos besoins en sécurité."
        />
        <meta
          name="keywords"
          content="catalogue, produits, Pixecurity, Boutique, caméras, surveillance, équipements réseau, logiciels, sécurité, Vivotek, Bosch, Zyxel, I-Pro, Milestone, Til Technologies, Cisco, Comnet, Vuwall, Briefcam, Technoaware"
        />
        <meta name="author" content="Pixecurity" />
      </Head>

      <RegisterPopup />

      <ShopNav />
      <ShopSearch isHero={false} onSearchResults={handleSearchResults} />

      <div className={styles["sweet-loading"]}>
        {(loading || isCategoryLoading) && (
          <PropagateLoader
            color={color}
            loading={loading || isCategoryLoading} // Afficher le loader si catégorie ou produits sont en chargement
            cssOverride={override}
            size={20}
            aria-label="Grid Loader"
            data-testid="loader"
          />
        )}
      </div>

      {searchResults.length === 0 && (
        <div className={styles["aside-products"]}>
          <ShopAside
            subcategory={subcategory}
            category={category}
            filters={filters}
          />
          <div className={styles["products-grid"]}>
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      <div ref={ref} style={{ height: "6rem" }} className={styles.ref}>
        {loading && (
          <PropagateLoader color={color} loading={loading} size={20} />
        )}
      </div>
    </div>
  );
};

export default Products;
