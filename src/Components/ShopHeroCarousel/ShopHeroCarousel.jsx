import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";

const heroImages = [
  { url: "/assets/shop/banners/banner5.webp", alt: "Sécurité réseau avancée" },
  { url: "/assets/shop/banners/banner1.webp", alt: "Solutions de vidéosurveillance" },
  { url: "/assets/shop/banners/banner2.webp", alt: "Contrôle d'accès intelligent" },
  { url: "/assets/shop/banners/banner4.webp", alt: "Technologie de sûreté moderne" },
];

const ShopHeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000, // durée avant changement
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className={styles.shop_hero_carousel_container}>
      <Slider {...settings}>
        {heroImages.map((image, index) => (
          <div key={index} className={styles.hero_slide}>
            <Image
              src={image.url}
              alt={image.alt}
              layout="responsive"
              width={1440}
              height={500}
              priority={index === 0} // seule la 1ère image est prioritaire
            
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShopHeroCarousel;
