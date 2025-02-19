import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { BASE_URL } from "@/url";
import { useGetUser } from "../useGetUser";

function ShopNav() {
  const [brands, setBrands] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [openBrand, setOpenBrand] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const user = useGetUser();
  const userId = user?._id;

  const navRef = useRef(null);

  // Charger toutes les marques
  useEffect(() => {
    fetch(`${BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((error) =>
        console.error("Erreur chargement des marques :", error)
      );
  }, []);

  // Charger les catégories spécifiques à chaque marque
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

  // Charger les sous-catégories spécifiques à chaque marque et catégorie

  useEffect(() => {
    const fetchSubcategories = async () => {
      const subcategoriesObj = {};

      for (const brand of brands) {
        if (!categoriesMap[brand]) continue; // Évite les erreurs si categoriesMap[brand] est undefined

        for (const category of categoriesMap[brand]) {
          try {
            const res = await fetch(
              `${BASE_URL}/subcategories?brand=${brand}&category=${category}`
            );
            const data = await res.json();

            // Stocke les sous-catégories en les associant à la marque et à la catégorie
            if (!subcategoriesObj[brand]) {
              subcategoriesObj[brand] = {};
            }
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

  // Gérer le clic en dehors du menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenBrand(null);
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleBrand = (brand) => {
    setOpenBrand(openBrand === brand ? null : brand);
    setOpenCategory(null);
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className={styles["shopNav-container"]} ref={navRef}>
      <ul>
        {brands.map((brand) => (
          <li key={brand} className={styles.dropdown}>
            <label onClick={() => toggleBrand(brand)}>{brand}</label>
            <ul
              className={styles["dropdown-menu"]}
              style={{ display: openBrand === brand ? "block" : "none" }}
            >
              {categoriesMap[brand]?.map((category) => (
                <li key={category}>
                  <label onClick={() => toggleCategory(category)}>
                    {category}
                  </label>
                  <ul
                    className={styles["dropdown-submenu"]}
                    style={{
                      display: openCategory === category ? "block" : "none",
                    }}
                  >
                    {/* <li>
                      <Link
                        href={`/boutique/${brand}/${category}${userId ? `?userId=${userId}` : ""}`}
                      >
                        Tous les produits
                      </Link>
                    </li> */}
                    {console.log(
                      "Subcategories for",
                      brand,
                      category,
                      ":",
                      subcategoriesMap[brand]?.[category]
                    )}

                    {subcategoriesMap[brand] &&
                    subcategoriesMap[brand][category] &&
                    Array.isArray(subcategoriesMap[brand][category])
                      ? subcategoriesMap[brand][category].map((subcategory) => (
                          <li key={subcategory}>
                            <Link
                              href={`/boutique/${brand}/${category}/${subcategory}${userId ? `?userId=${userId}` : ""}`}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))
                      : null}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShopNav;
