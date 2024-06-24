import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/url";
import Swal from "sweetalert2";
import styles from "./style.module.scss";

export default function AdminDiscountForm() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [brands, setBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [discountData, setDiscountData] = useState({
    name: "",
    description: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    isGlobalDiscount: "false",
    products: [],
    targetedUsers: [],
    targetedBrands: [],
    startDate: "",
    endDate: "",
    status: "active",
  });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    setProducts(data);
    const categories = [...new Set(data.map((product) => product.category))];
    setCategories(categories);
    const subcategories = {};
    categories.forEach((category) => {
      subcategories[category] = [
        ...new Set(
          data
            .filter((product) => product.category === category)
            .map((product) => product.subcategory)
        ),
      ];
    });
    setSubcategories(subcategories);
    setBrands([...new Set(data.map((product) => product.brand))]);
  };

  const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const handleSelectProduct = (product) => {
    if (!selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
    }
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setDiscountData({
      ...discountData,
      [name]: name === "discountValue" ? parseFloat(value) : value,
    });
  };

  const handleSelectSubcategory = (subcategory, category) => {
    const updatedSelection = { ...selectedSubcategories };
    updatedSelection[subcategory] = !updatedSelection[subcategory];

    const subcategoryProducts = products.filter(
      (product) =>
        product.subcategory === subcategory && product.category === category
    );

    if (updatedSelection[subcategory]) {
      setSelectedProducts([
        ...selectedProducts,
        ...subcategoryProducts.filter(
          (product) => !selectedProducts.some((p) => p._id === product._id)
        ),
      ]);
    } else {
      setSelectedProducts(
        selectedProducts.filter(
          (product) => product.subcategory !== subcategory
        )
      );
    }

    setSelectedSubcategories(updatedSelection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const discountPayload = {
      ...discountData,
      products: selectedProducts.map((product) => product._id),
    };

    try {
      const response = await fetch(`${BASE_URL}/discounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discountPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create discount");
      }

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "La réduction a été créée avec succès.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.message,
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Créer une opération commerciale</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nom *</label>
          <p>(Attribuer un nom explicite) </p>
          <input
            type="text"
            name="name"
            value={discountData.name}
            onChange={handleDiscountChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description *</label>
          <p>(Attribuer une description claire de l'opération) </p>
          <textarea
            name="description"
            value={discountData.description}
            onChange={handleDiscountChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Code</label>
          <input
            type="text"
            name="code"
            value={discountData.code}
            onChange={handleDiscountChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Type de remise *</label>
          <select
            name="discountType"
            value={discountData.discountType}
            onChange={handleDiscountChange}
          >
            <option value="percentage">Pourcentage</option>
            {/* <option value="fixed">Fixe</option> */}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Valeur de la remise *</label>
          <input
            type="number"
            name="discountValue"
            value={discountData.discountValue}
            onChange={handleDiscountChange}
            required
          />
        </div>

       



        <div className={styles.formGroup}>
          <label>Date de début *</label>
          <input
            type="date"
            name="startDate"
            value={discountData.startDate}
            onChange={handleDiscountChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Date de fin *</label>
          <input
            type="date"
            name="endDate"
            value={discountData.endDate}
            onChange={handleDiscountChange}
            required
          />
        </div>


      

        <div className={styles.formGroup}>
          <label>Utilisateurs ciblés</label>
          <p>(Sélectionner un utilisateur ou aucun si la promo concerne tout le monde)</p>
          <select
            multiple
            name="targetedUsers"
            value={discountData.targetedUsers}
            onChange={(e) =>
              setDiscountData({
                ...discountData,
                targetedUsers: [...e.target.selectedOptions].map(
                  (option) => option.value
                ),
              })
            }
          >
            <option value="">Sélectionner un utilisateur </option>
            
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Réduction globale</label>
          <p> OPTION 1: Concerne tous les produits et cible tous les utilisateurs ou un spécifique </p>
          <select
            name="isGlobalDiscount"
            value={discountData.isGlobalDiscount}
            onChange={handleDiscountChange}
          >
            <option value="false">Non</option>
            <option value="true">Oui</option>
          </select>
        </div>

        <p className={styles.orOption}>--------------------------   OU    --------------------------</p>

        <div className={styles.formGroup}>
          <label>Marques ciblées</label>
          <p> OPTION 2 : on sélectionne une marque (tous les produits associés seront concernés)</p>
          <select
            name="targetedBrands"
            value={discountData.targetedBrands}
            onChange={(e) =>
              setDiscountData({
                ...discountData,
                targetedBrands: [e.target.value],
              })
            }
          >
            <option value="">Sélectionner une marque</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <p className={styles.orOption}>--------------------------   OU    --------------------------</p>
        <div className={styles.productsContainer}>
        <p className={styles.targetOptions}> OPTION 3 : on sélectionne les produits concernés </p>
          <h3>Produits</h3>
          {categories.map((category) => (
            <div key={category} className={styles.categorySection}>
              <h4>{category}</h4>
              {subcategories[category].map((subcategory) => (
                <div key={subcategory} className={styles.subcategorySection}>
                  <h5>
                    <label>
                      <input
                        className={styles.selectAllCheckbox}
                        type="checkbox"
                        checked={selectedSubcategories[subcategory] || false}
                        onChange={() =>
                          handleSelectSubcategory(subcategory, category)
                        }
                      />
                      {subcategory} (Sélectionner tout)
                    </label>
                  </h5>
                  {products
                    .filter(
                      (product) =>
                        product.category === category &&
                        product.subcategory === subcategory &&
                        (!discountData.targetedBrands.length ||
                          discountData.targetedBrands.includes(product.brand))
                    )
                    .map((product) => (
                      <div key={product._id} className={styles.productItem}>
                        <label>
                          
                          <input
                            type="checkbox"
                            checked={selectedProducts.some(
                              (p) => p._id === product._id
                            )}
                            onChange={() => handleSelectProduct(product)}
                          />
                          {product.name}
                        </label>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>
          Créer la réduction
        </button>
      </form>
    </div>
  );
}
