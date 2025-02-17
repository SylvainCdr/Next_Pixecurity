// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import styles from "./style.module.scss";
// import { BASE_URL } from "@/url";
// import { useGetUser } from "../useGetUser";

// function ShopNav() {
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategoriesMap, setSubcategoriesMap] = useState({});
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openSubcategory, setOpenSubcategory] = useState(null);
//   const user = useGetUser();
//   const userId = user?._id;

//   const navRef = useRef(null); // Reference pour le conteneur du menu

//   useEffect(() => {
//     // Charger toutes les marques
//     fetch(`${BASE_URL}/brands`)
//       .then((res) => res.json())
//       .then((data) => setBrands(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des marques :", error)
//       );
//   }
//   , []);
  
//   console.log (brands);


//   useEffect(() => {
//     // Charger toutes les catégories
//     fetch(`${BASE_URL}/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des catégories :", error)
//       );
//   }, []);

//   console.log (categories);

//   // charger les marque pour chaque catégorie
//   const [categoriesMap, setCategoriesMap] = useState({});
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const categoriesData = await Promise.all(
//         brands.map((brand) =>
//           fetch(`${BASE_URL}/categories?brand=${brand}`)
//             .then((res) => res.json())
//             .catch((error) => {
//               console.error(
//                 `Erreur lors de la récupération des catégories pour ${brand} :`,
//                 error
//               );
//               return [];
//             })
//         )
//       );

//       // Construire un objet associant chaque marque à ses catégories
//       const categoriesObj = {};
//       brands.forEach((brand, index) => {
//         categoriesObj[brand] = categoriesData[index];
//       });

//       setCategoriesMap(categoriesObj);
//     };

//     if (brands.length > 0) {
//       fetchCategories();
//     }
//   }, [brands]);

//   useEffect(() => {
//     // Charger les sous-catégories pour chaque catégorie
//     const fetchSubcategories = async () => {
//       const subcategoriesData = await Promise.all(
//         categories.map((category) =>
//           fetch(`${BASE_URL}/subcategories?category=${category}`)
//             .then((res) => res.json())
//             .catch((error) => {
//               console.error(
//                 `Erreur lors de la récupération des sous-catégories pour ${category} :`,
//                 error
//               );
//               return [];
//             })
//         )
//       );

//       // Construire un objet associant chaque catégorie à ses sous-catégories
//       const subcategoriesObj = {};
//       categories.forEach((category, index) => {
//         subcategoriesObj[category] = subcategoriesData[index];
//       });

//       setSubcategoriesMap(subcategoriesObj);
//     };

//     if (categories.length > 0) {
//       fetchSubcategories();
//     }
//   }, [categories]);

//   useEffect(() => {
//     // Fonction pour gérer les clics en dehors du menu
//     const handleClickOutside = (event) => {
//       if (navRef.current && !navRef.current.contains(event.target)) {
//         setOpenCategory(null);
//         setOpenSubcategory(null);
//       }
//     };

//     // Ajouter l'écouteur d'événements
//     document.addEventListener("mousedown", handleClickOutside);

//     // Nettoyer l'écouteur d'événements à la destruction du composant
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleCategory = (category) => {
//     setOpenCategory(openCategory === category ? null : category);
//     setOpenSubcategory(null); // Fermer le dropdown de la sous-catégorie lorsqu'on ouvre une nouvelle catégorie
//   };

//   const toggleSubcategory = (subcategory) => {
//     setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
//     setOpenCategory(null); // Fermer le dropdown de la catégorie lorsqu'on clique sur une sous-catégorie
//   };

//   // Modification de l'ordre des catégories
//   const order = ["camera", "Réseau", "Logiciels", "Autres"];

//   // Trier les catégories selon l'ordre spécifié
//   const sortedCategories = categories.sort(
//     (a, b) => order.indexOf(a) - order.indexOf(b)
//   );

//   return (
//     <div className={styles["shopNav-container"]} ref={navRef}>
//       <ul>
//         {sortedCategories.map((category) => (
//           <li key={category} className={styles.dropdown}>
//             <label
//               htmlFor={category}
//               data-toggle="dropdown"
//               onClick={() => toggleCategory(category)}
//             >
//               {category}
//             </label>
//             <input type="checkbox" id={category} style={{ display: "none" }} />
//             <ul
//               className={styles["dropdown-menu"]}
//               style={{ display: openCategory === category ? "block" : "none" }}
//             >
//               <li>
//                 <Link
//                   href={`/boutique/${category}${userId ? `?userId=${userId}` : ""}`}
//                 >
//                   Tous les produits
//                 </Link>
//               </li>
//               {subcategoriesMap[category]?.map((subcategory) => (
//                 <li key={subcategory}>
//                   <Link
//                     href={`/boutique/${category}/${subcategory}${userId ? `?userId=${userId}` : ""}`}
//                     onClick={() => toggleSubcategory(subcategory)}
//                     className={
//                       openSubcategory === subcategory ? styles.active : ""
//                     }
//                   >
//                     {subcategory}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShopNav;
