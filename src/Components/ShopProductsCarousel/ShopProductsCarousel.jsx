"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import { useCartContext } from "../cartContext";
import { useGetUser } from "../useGetUser";

const ShopProductsCarousel = ({ carouselProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderReady, setSliderReady] = useState(false);

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();

  const user = useGetUser();
  const userId = user?._id;
  const discount = user?.discount || 0;

  const calculateDiscount = (price, discount) =>
    price - (price * discount) / 100;

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      renderMode: "performance",
      slides: { perView: 5, spacing: 15 },
      defaultAnimation: { duration: 400 },
      breakpoints: {
        "(max-width: 1440px)": { slides: { perView: 4, spacing: 10 } },
        "(max-width: 1124px)": { slides: { perView: 3, spacing: 10 } },
        "(max-width: 800px)": { slides: { perView: 2, spacing: 10 } },
        "(max-width: 600px)": { slides: { perView: 1, spacing: 5 } },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        const clearNext = () => clearTimeout(timeout);
        const startNext = () => {
          clearNext();
          if (!mouseOver) timeout = setTimeout(() => slider.next(), 4000);
        };

        slider.on("created", () => {
          setSliderReady(true);
          slider.update(); // ← force le recalcul initial → plus de superposition
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNext();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            startNext();
          });
          startNext();
        });

        slider.on("dragStarted", clearNext);
        slider.on("animationEnded", startNext);
        slider.on("updated", startNext);
      },
    ]
  );

  return (
    <div className="carousel-container">
      <div ref={sliderRef} className="keen-slider">
        {carouselProducts?.map((product, idx) => (
          <div className="keen-slider__slide" key={idx}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopProductsCarousel;
