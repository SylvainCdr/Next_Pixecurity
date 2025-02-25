import React, { useState, useEffect } from "react";
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
  const user = useGetUser();
  const userId = user?._id;

  useEffect(() => {
    fetch(`${BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((error) =>
        console.error("Erreur chargement des marques :", error)
      );
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesObj = {};
      for (const brand of brands) {
        try {
          const res = await fetch(`${BASE_URL}/categories?brand=${brand}`);
          const data = await res.json();
          categoriesObj[brand] = data;
        } catch (error) {
          console.error(
            `Erreur chargement des catégories pour ${brand} :`,
            error
          );
        }
      }
      setCategoriesMap(categoriesObj);
    };

    if (brands.length > 0) {
      fetchCategories();
    }
  }, [brands]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const subcategoriesObj = {};
      for (const brand of brands) {
        if (!categoriesMap[brand]) continue;
        for (const category of categoriesMap[brand]) {
          try {
            const res = await fetch(
              `${BASE_URL}/subcategories?brand=${brand}&category=${category}`
            );
            const data = await res.json();
            if (!subcategoriesObj[brand]) subcategoriesObj[brand] = {};
            subcategoriesObj[brand][category] = data;
          } catch (error) {
            console.error(
              `Erreur chargement des sous-catégories pour ${category} de ${brand} :`,
              error
            );
          }
        }
      }
      setSubcategoriesMap(subcategoriesObj);
    };

    if (Object.keys(categoriesMap).length > 0) {
      fetchSubcategories();
    }
  }, [categoriesMap]);

  const handleBrandClick = (brand) => {
    setActiveBrand(activeBrand === brand ? null : brand);
    setActiveCategory(null); // Reset active category when changing brand
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleSubcategoryClick = () => {
    setActiveBrand(null); // Ferme la navigation principale après avoir sélectionné une sous-catégorie
    setActiveCategory(null); // Ferme la catégorie active
    setIsMobileMenuOpen(false); // Ferme le menu mobile
    setIsSubcategoryLoading(true);
  };

  return (
    <div className={styles.shopNavContainer}>
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
            {subcategoriesMap[activeBrand]?.[category]?.map((subcategory) => (
              <motion.li
                key={subcategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/boutique/${activeBrand}/${category}/${subcategory}`}
                  onClick={handleSubcategoryClick}
                >
                  {subcategory}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ))}
    </motion.div>
  )}
</div>


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
                                href={`/boutique/${brand}/${category}/${subcategory}`}
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
