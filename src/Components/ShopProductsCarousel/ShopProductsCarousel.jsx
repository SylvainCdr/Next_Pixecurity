import React from "react";
import Slider from "react-slick";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import { useCartContext } from "../cartContext";
import { useGetUser } from "../useGetUser";

const ShopProductsCarousel = ({ carouselProducts }) => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,

    autoplaySpeed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: "ondemand", // ⚡ optimise le chargement
    responsive: [
      { breakpoint: 1480, settings: { slidesToShow: 4 } },
      { breakpoint: 1124, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2, initialSlide: 0 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();

  const user = useGetUser();
  const userId = user?._id;
  const discount = user?.discount || 0;

  const calculateDiscount = (price, discount) =>
    price - (price * discount) / 100;

  return (
    <div
      className={styles["shopCarousel-container"]}
      role="region"
      aria-roledescription="carousel"
      aria-label="Produits en promotion"
    >
      <Slider {...settings}>
        {carouselProducts?.map((product, index) => {
          const discountedPrice = calculateDiscount(product.price, discount);
          return (
            <div className={styles["product-item"]} key={product._id || index}>
              <ProductCard
                product={product}
                discountedPrice={discountedPrice}
                userId={userId}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                checkFavorite={checkFavorite}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShopProductsCarousel;
