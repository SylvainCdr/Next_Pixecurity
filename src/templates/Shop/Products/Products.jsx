import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";



// on importe les produits depuis Api/products 
const Products = ({ products, category, subcategory, filters }) => {
  console.log({ products });

// contient les styles du loader
  const override = {
    size: "15px",
    margin: "0 auto",
    borderColor: "red",
  };

  // on initialise le state loading à true
  // on initialise la couleur du loader
  const [loading, setLoading] = useState(true);
  const [color] = useState("#ff9c3fc0");



  return (
    <div className={styles["products-container"]}>
      <ShopNav />
      <ShopSearch isHero={false} />
      
      {loading && (
        <div className={styles["sweet-loading"]}>
          <PropagateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Grid Loader"
            data-testid="loader"
          />
        </div>
      )}

      <div className={styles["aside-products"]}>
        <ShopAside
          subcategory={subcategory}
          category={category}
          filters={filters}
        />
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
