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
  const user = useGetUser();
  const userId = user?._id;
  const menuRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Erreur chargement des marques :", error));
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
          console.error(`Erreur chargement des catégories pour ${brand} :`, error);
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
            const res = await fetch(`${BASE_URL}/subcategories?brand=${brand}&category=${category}`);
            const data = await res.json();
            if (!subcategoriesObj[brand]) subcategoriesObj[brand] = {};
            subcategoriesObj[brand][category] = data;
          } catch (error) {
            console.error(`Erreur chargement des sous-catégories pour ${category} de ${brand} :`, error);
          }
        }
      }
      setSubcategoriesMap(subcategoriesObj);
    };
    if (Object.keys(categoriesMap).length > 0) {
      fetchSubcategories();
    }
  }, [categoriesMap]);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveBrand(null);
      }
    };

    if (activeBrand) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeBrand]);

  return (
    <div className={styles.shopNavContainer}>
      <ul className={styles.brandList}>
        {brands.map((brand) => (
          <li key={brand} onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}>
            {brand}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeBrand && (
          <motion.div
            className={styles.fullWidthMenu}
            ref={menuRef}
            initial={{ opacity: 0, y: -150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -150 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={styles.categoryColumns}>
              {categoriesMap[activeBrand]?.map((category) => (
                <div key={category} className={styles.categorySection}>
                  <h2>{category}</h2>
                  <ul>
                    {subcategoriesMap[activeBrand]?.[category]?.map((subcategory) => (
                      <li key={subcategory}>
                        <Link
                          href={`/boutique/${activeBrand}/${category}/${subcategory}${userId ? `?userId=${userId}` : ""}`}
                          onClick={() => setActiveBrand(null)} // Ferme le menu au clic sur un lien
                        >
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShopNav;
