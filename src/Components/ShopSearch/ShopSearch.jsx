import React, { useState } from "react";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import { useCartContext } from "../cartContext";
import { BASE_URL } from "../../url";
import ShopHeroCarousel from "../ShopHeroCarousel/ShopHeroCarousel";
import { PropagateLoader } from "react-spinners";

const color = "#ff9c3fc0";
const override = {
  size: "15px",
  margin: "0 auto",
  borderColor: "red",
};

function ShopSearch({ isHero = true, onSearchResults }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Nouvel état pour le produit sélectionné
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCartContext();


  const handleSearch = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Marque que la recherche a été soumise
  
    if (search.length > 0) {
      setSearching(true);
  
      fetch(`${BASE_URL}/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
          onSearchResults(data);
          setSelectedProduct(null);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResults([]);
      onSearchResults([]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSearchResults([]); // Réinitialiser les résultats de recherche
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

      {searchResults.length > 0 && !selectedProduct && (
        <div className={styles["search-msg"]}>
          <p>Résultats de recherche ({searchResults.length} produits) </p>
        </div>
      )}

  {/* Afficher le message uniquement après soumission et si aucun résultat n'a été trouvé */}
{isSubmitted && !searching && search.length > 0 && searchResults.length === 0 && (
  <div className={styles["search-msg"]}>
    <p>Aucun résultat pour "{search}"</p>
  </div>
)}
      {!selectedProduct && (
        <div className={styles["search-grid"]}>
          {searchResults?.map((result) => (
            <ProductCard
              key={result._id}
              product={result}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              checkFavorite={checkFavorite}
              addToCart={addToCart}
              onClick={() => handleProductClick(result)} // Gérer le clic sur le produit
            />
          ))}
        </div>
      )}

      {/* Afficher le produit sélectionné */}
      {selectedProduct && (
        <div className={styles["selected-product"]}>
          <h2>{selectedProduct.name}</h2>
          <ProductCard
            product={selectedProduct}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            checkFavorite={checkFavorite}
            addToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
}

export default ShopSearch;
