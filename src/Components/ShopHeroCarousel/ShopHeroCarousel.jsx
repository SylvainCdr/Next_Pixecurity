"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./style.module.scss";
import Head from "next/head";

const heroImages = [
  { url: "/assets/shop/banners/banner-diviniti.webp", alt: "DIVINITI" },
  {
    url: "/assets/shop/banners/banner-milestone.webp",
    alt: "Milestone systems",
  },
  { url: "/assets/shop/banners/banner-ipro.webp", alt: "i-Pro" },
  { url: "/assets/shop/banners/banner-zyxel.webp", alt: "Zyxel" },
];

const ShopHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
      slides: { perView: 1 },
      defaultAnimation: { duration: 700 },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 4000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/assets/shop/banners/banner-diviniti.webp"
        />
      </Head>

      <div className={styles.shop_hero_carousel_container}>
        <div ref={sliderRef} className="keen-slider">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`keen-slider__slide ${styles.hero_slide}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={idx === currentSlide ? styles.activeDot : ""}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopHeroCarousel;
