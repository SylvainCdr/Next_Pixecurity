import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/url";
import Swal from "sweetalert2";
import styles from "./style.module.scss";

export default function AdminDiscountForm() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discountData, setDiscountData] = useState({
    name: "",
    description: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    products: [],
    targetedUsers: [],
    targetedCategories: [],
    targetedSubcategories: [],
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
    setCategories([...new Set(data.map((product) => product.category))]);
    setSubcategories([...new Set(data.map((product) => product.subcategory))]);
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
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    }
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setDiscountData({
      ...discountData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const discountPayload = {
      ...discountData,
      products: selectedProducts.map(product => ({
        product: product._id,
        name: product.name,
        ref: product.ref,
        price: product.price,
        discount: discountData.discountValue,
      })),
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
        throw new Error("Failed to create discount");
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
      <h1>Créer une réduction</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nom</label>
          <input type="text" name="name" value={discountData.name} onChange={handleDiscountChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea name="description" value={discountData.description} onChange={handleDiscountChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Code</label>
          <input type="text" name="code" value={discountData.code} onChange={handleDiscountChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Type de remise</label>
          <select name="discountType" value={discountData.discountType} onChange={handleDiscountChange}>
            <option value="percentage">Pourcentage</option>
            <option value="fixed">Fixe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Valeur de la remise</label>
          <input type="number" name="discountValue" value={discountData.discountValue} onChange={handleDiscountChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Date de début</label>
          <input type="date" name="startDate" value={discountData.startDate} onChange={handleDiscountChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Date de fin</label>
          <input type="date" name="endDate" value={discountData.endDate} onChange={handleDiscountChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Utilisateurs ciblés</label>
          <select multiple name="targetedUsers" value={discountData.targetedUsers} onChange={(e) => setDiscountData({ ...discountData, targetedUsers: [...e.target.selectedOptions].map(option => option.value) })}>
            <option value="all">Tous les utilisateurs</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Catégories ciblées</label>
          <select multiple name="targetedCategories" value={discountData.targetedCategories} onChange={(e) => setDiscountData({ ...discountData, targetedCategories: [...e.target.selectedOptions].map(option => option.value) })}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Sous-catégories ciblées</label>
          <select multiple name="targetedSubcategories" value={discountData.targetedSubcategories} onChange={(e) => setDiscountData({ ...discountData, targetedSubcategories: [...e.target.selectedOptions].map(option => option.value) })}>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Marques ciblées</label>
          <select multiple name="targetedBrands" value={discountData.targetedBrands} onChange={(e) => setDiscountData({ ...discountData, targetedBrands: [...e.target.selectedOptions].map(option => option.value) })}>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className={styles.productsContainer}>
          <h3>Produits</h3>
          {products.filter(product =>
            (!discountData.targetedCategories.length || discountData.targetedCategories.includes(product.category)) &&
            (!discountData.targetedSubcategories.length || discountData.targetedSubcategories.includes(product.subcategory)) &&
            (!discountData.targetedBrands.length || discountData.targetedBrands.includes(product.brand))
          ).map(product => (
            <div key={product._id} className={styles.productItem}>
              <label>
                <input type="checkbox" value={product._id} onChange={() => handleSelectProduct(product)} />
                {product.name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>Créer la réduction</button>
      </form>
    </div>
  );
}
