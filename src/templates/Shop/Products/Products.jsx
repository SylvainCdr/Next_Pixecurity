import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ShopAside from "@/Components/ShopAside/ShopAside";
import styles from "./style.module.scss";

// Destructure the products, category, and subcategory props

const Products = ({ products, category, subcategory, filters }) => {
  console.log({ products });
  return (
    <div className={styles["products-container"]}>
      <ShopNav />
      <ShopSearch isHero={false} />
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
