import React, { useState } from "react";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import { useCartContext } from "../cartContext";
import { BASE_URL } from "../../url";
import ShopHeroCarousel from "../ShopHeroCarousel/ShopHeroCarousel";
import { PropagateLoader } from "react-spinners"; // Import the loader

const color = "#ff9c3fc0"; // Define loader color
const override = { // Define loader styles
  size: "15px",
  margin: "0 auto",
  borderColor: "red",
};

function ShopSearch({ isHero = true, onSearchResults }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission

    if (search.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`${BASE_URL}/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
          onSearchResults(data); // Pass search results to the parent component
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResults([]);
      onSearchResults([]); // Pass an empty array to the parent component when search is cleared
    }
  };

  return (
    <div className={styles["search-container"]}>
      <form onSubmit={handleSearch}>
        <div className={styles["search-bar"]}>
          <input
            type="text"
            placeholder="Rechercher un produit"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </div>
      </form>

      {/* Display loader when searching */}
      <div className={styles["sweet-loading"]}>
        {searching && (
          <PropagateLoader
            color={color}
            loading={searching}
            cssOverride={override}
            size={20}
            aria-label="Grid Loader"
            data-testid="loader"
          />
        )}
      </div>

      {isHero && searchResults.length === 0 && !searching && (
        <div className={styles["shop-hero-carousel"]}>
          <ShopHeroCarousel />
        </div>
      )}

      {/* si résultats de recherche locaux n'est pas vide, afficher les résultats */}
      {searchResults.length > 0 && (
        <div className={styles["search-msg"]}>
          <p>Résultats de recherche ({searchResults.length} produits) :</p>
        </div>
      )}

      <div className={styles["search-grid"]}>
        {searchResults?.map((result) => (
          <ProductCard
            key={result._id}
            product={result}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            checkFavorite={checkFavorite}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopSearch;
