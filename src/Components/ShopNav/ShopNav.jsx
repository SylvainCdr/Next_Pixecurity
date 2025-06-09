import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { BASE_URL } from "@/url";
import { useGetUser } from "../useGetUser";
import { motion, AnimatePresence } from "framer-motion";

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
      }
    };

    fetchSubcategories();
  }, [categoriesMap]);

  const handleBrandClick = (brand) => {
    setActiveBrand((prevBrand) => (prevBrand === brand ? null : brand));
    setActiveCategory(null);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
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
    if (!overlay) return; // Évite l'erreur si l'élément n'est pas trouvé

    if (isMobileMenuOpen) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.shopNavContainer} ref={menuRef}>
      <button
        className={styles.burgerMenu}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Menu Desktop - Large bande pour les marques */}
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
            {categoriesMap[activeBrand]?.map((category) => (
              <div key={category}>
                <motion.h2
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {category}
                </motion.h2>
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {subcategoriesMap[activeBrand]?.[category]?.map(
                    (subcategory) => (
                      <motion.li
                        key={subcategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={`/boutique/${activeBrand}/${category}/${subcategory}${userIdParam}`}
                          onClick={handleSubcategoryClick}
                        >
                          {subcategory}
                        </Link>
                      </motion.li>
                    )
                  )}
                </motion.ul>
              </div>
            ))}
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
                          {activeCategory === category && (
                            <motion.ul
                              className={styles.mobileSubcategoryList}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {subcategoriesMap[brand]?.[category]?.map(
                                (subcategory) => (
                                  <motion.li
                                    key={subcategory}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Link
                                      href={`/boutique/${activeBrand}/${category}/${subcategory}${userIdParam}`}
                                      onClick={handleSubcategoryClick}
                                    >
                                      {subcategory}
                                    </Link>
                                  </motion.li>
                                )
                              )}
                            </motion.ul>
                          )}
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
