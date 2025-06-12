import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";

const heroImages = [
  {
    url: "/assets/shop/banners/banner5.webp",
  },
  {
    url: "/assets/shop/banners/banner3.webp",
  },
  {
    url: "/assets/shop/banners/banner1.webp",
  },
  {
    url: "/assets/shop/banners/banner2.webp",
  },

];

const ShopHeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className={styles.shop_hero_carousel_container}>
      <Slider {...settings}>
        {heroImages.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt="hero" loading="lazy" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ShopHeroCarousel;
