import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { BASE_URL } from "@/url";
import { useGetUser } from "../useGetUser";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

function ShopNav() {
  const [brands, setBrands] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
  const menuRef = useRef(null);
  const user = useGetUser();
  const userId = user?._id;
  const userIdParam = userId ? `?userId=${userId}` : "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((error) =>
        console.error("Erreur chargement des marques :", error)
      );
  }, []);

  useEffect(() => {
    if (brands.length === 0) return;

    const fetchCategories = async () => {
      try {
        const results = await Promise.all(
          brands.map(async (brand) => {
            const res = await fetch(`${BASE_URL}/categories?brand=${brand}`);
            return { brand, categories: await res.json() };
          })
        );
        const categoriesObj = results.reduce((acc, { brand, categories }) => {
          acc[brand] = categories;
          return acc;
        }, {});
        setCategoriesMap(categoriesObj);
      } catch (error) {
        console.error("Erreur chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, [brands]);

  useEffect(() => {
    if (Object.keys(categoriesMap).length === 0) return;

    const fetchSubcategories = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(
          Object.entries(categoriesMap).flatMap(([brand, categories]) =>
            categories.map(async (category) => {
              const res = await fetch(
                `${BASE_URL}/subcategories?brand=${brand}&category=${category}`
              );
              return { brand, category, subcategories: await res.json() };
            })
          )
        );

        const subcategoriesObj = results.reduce(
          (acc, { brand, category, subcategories }) => {
            if (!acc[brand]) acc[brand] = {};
            acc[brand][category] = subcategories;
            return acc;
          },
          {}
        );
        setSubcategoriesMap(subcategoriesObj);
      } catch (error) {
        console.error("Erreur chargement des sous-catégories :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoriesMap]);

  const handleBrandClick = async (brand) => {
    setActiveBrand((prev) => (prev === brand ? null : brand));
    setActiveCategory(null);

    if (!categoriesMap[brand]) {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/categories?brand=${brand}`);
        const categories = await res.json();
        setCategoriesMap((prev) => ({ ...prev, [brand]: categories }));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCategoryClick = async (category) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );

    if (!subcategoriesMap[activeBrand]?.[category]) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/subcategories?brand=${activeBrand}&category=${category}`
        );
        const subs = await res.json();
        setSubcategoriesMap((prev) => ({
          ...prev,
          [activeBrand]: {
            ...prev[activeBrand],
            [category]: subs,
          },
        }));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubcategoryClick = () => {
    setActiveBrand(null);
    setActiveCategory(null);
    setIsMobileMenuOpen(false);
    setIsSubcategoryLoading(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveBrand(null);
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    if (!overlay) return;

    if (isMobileMenuOpen) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }
  }, [isMobileMenuOpen]);

  const PropagateLoader = dynamic(
    () => import("react-spinners").then((mod) => mod.PropagateLoader),
    { ssr: false }
  );

  return (
    <div className={styles.shopNavContainer} ref={menuRef}>
      <button
        className={styles.burgerMenu}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Menu Desktop */}
      <div className={styles.desktopMenu}>
        <div className={styles.brandBar}>
          <ul className={styles.brandList}>
            {brands.map((brand) => (
              <li
                key={brand}
                onClick={() => handleBrandClick(brand)}
                onMouseEnter={() => handleBrandClick(brand)}
                className={activeBrand === brand ? "active" : ""}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {activeBrand && (
          <motion.div
            className={styles.categoryList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isLoading ? (
              <div className={styles.loaderContainer}>
                <PropagateLoader color="#ff9c3fc0" size={20} />
              </div>
            ) : (
              categoriesMap[activeBrand]?.map((category) => (
                <div key={category}>
                  <motion.h2>{category}</motion.h2>
                  <motion.ul>
                    {subcategoriesMap[activeBrand]?.[category]?.map((sub) => (
                      <motion.li key={sub.slugSubcategory}>
                        <Link
                          href={`/boutique/${sub.slugBrand}/${sub.slugCategory}/${sub.slugSubcategory}${userIdParam}`}
                          onClick={handleSubcategoryClick}
                        >
                          {sub.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>

      <div className="overlay"></div>

      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.active : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <button
              className={styles.closeMenu}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✖
            </button>

            <ul className={styles.mobileBrandList}>
              {brands.map((brand) => (
                <li
                  key={brand}
                  onClick={() => handleBrandClick(brand)}
                  className={styles.mobileBrandListLi}
                >
                  {brand}
                  {activeBrand === brand && (
                    <motion.ul
                      className={styles.mobileCategoryList}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categoriesMap[brand]?.map((category) => (
                        <motion.li
                          key={category}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(category);
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {category}
                          {activeCategory === category &&
                            (isLoading ? (
                              <div className={styles.loaderContainer}>
                                <PropagateLoader color="#0070f3" size={10} />
                              </div>
                            ) : (
                              <motion.ul
                                className={styles.mobileSubcategoryList}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {subcategoriesMap[brand]?.[category]?.map(
                                  (sub) => (
                                    <motion.li key={sub.slugSubcategory}>
                                      <Link
                                        href={`/boutique/${sub.slugBrand}/${sub.slugCategory}/${sub.slugSubcategory}${userIdParam}`}
                                        onClick={handleSubcategoryClick}
                                      >
                                        {sub.name}
                                      </Link>
                                    </motion.li>
                                  )
                                )}
                              </motion.ul>
                            ))}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShopNav;
