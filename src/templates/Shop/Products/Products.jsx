import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";
import { PropagateLoader } from "react-spinners";
import { useRouterLoading } from "@/Components/useRouterLoading";

const color = "#ff9c3fc0";
// contient les styles du loader
const override = {
  size: "15px",
  margin: "0 auto",
  borderColor: "red",
};

// on importe les produits depuis Api/products
const Products = ({ products, subcategory, filters }) => {
  console.log({ products });

  const loading = useRouterLoading();

  return (
    <div className={styles["products-container"]}>
      <ShopNav />
      <ShopSearch isHero={false} />

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
        <ShopAside subcategory={subcategory} filters={filters} />
        <div className={styles["products-grid"]}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
