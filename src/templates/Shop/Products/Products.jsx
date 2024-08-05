import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";
import { PropagateLoader } from "react-spinners";
import { useRouterLoading } from "@/Components/useRouterLoading";
import Head from "next/head";
import RegisterPopup from "@/Components/RegisterPopup/RegisterPopup";
//import ShopHeroCarousel from "@/Components/ShopHeroCarousel/ShopHeroCarousel";

const color = "#ff9c3fc0";
// contient les styles du loader
const override = {
  size: "15px",
  margin: "0 auto",
  borderColor: "red",
};

const Products = ({ products, category, subcategory, filters }) => {
  const loading = useRouterLoading();

  // Sort products by name alphabetically
  const sortedProducts = products.sort((a, b) => {
    // Compare product names in lowercase to ensure case-insensitive sorting
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

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
      <ShopSearch isHero={false} />
      {/* <ShopHeroCarousel /> */}
      <div className={styles["sweet-loading"]}>
        {loading && (
          <PropagateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Grid Loader"
            data-testid="loader"
          />
        )}
      </div>

      <div className={styles["aside-products"]}>
        <ShopAside
          subcategory={subcategory}
          category={category}
          filters={filters}
        />
        <div className={styles["products-grid"]}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
