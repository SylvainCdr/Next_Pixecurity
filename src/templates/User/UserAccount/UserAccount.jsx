import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import useFavorites from "@/Components/useFavorites";
import ProductCard from "@/Components/ProductCard/ProductCard";
import { useCartContext } from "@/Components/cartContext";
import DeliveryTimeline from "@/Components/DeliveryTimeline/DeliveryTimeline";
import AOS from "aos";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";
import Link from "next/link";

export default function UserAccount() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("favoris");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [countFavorites, setCountFavorites] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [discounts, setDiscounts] = useState([]);

  const { getFavorites, removeFromFavorites, checkFavorite, addToFavorites } =
    useFavorites();
  const { addToCart, cartItemsCount } = useCartContext();
  const user = useGetUser();
  const userId = user?._id;

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;

      try {
        const [productsData, favoritesData] = await Promise.all([
          fetch(`${BASE_URL}/products?userId=${userId}`).then((res) =>
            res.json()
          ),
          getFavorites(userId),
        ]);

        setProducts(productsData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);
        const data = await response.json();
        const sortedOrders = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };

    fetchOrders();
  }, [userId]);

  useEffect(() => {
    setCountFavorites(favorites.length);
  }, [favorites]);

  useEffect(() => {
    setCountOrders(orders.length);
  }, [orders]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${BASE_URL}/discounts`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des remises");
        }
        const data = await response.json();
        const activeDiscounts = data.filter(
          (discount) =>
            new Date(discount.startDate) <= new Date() &&
            new Date(discount.endDate) >= new Date()
        );
        const userDiscounts = activeDiscounts.filter(
          (discount) =>
            discount.targetedUsers.length === 0 ||
            discount.targetedUsers.includes(userId)
        );

        const discountsMap = userDiscounts.reduce((acc, discount) => {
          acc[discount._id] = discount;
          return acc;
        }, {});

        setDiscounts(discountsMap);
      } catch (err) {
        console.error("Erreur lors de la récupération des remises :", err);
      }
    };

    fetchDiscounts();
  }, [userId]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleProductClick = (productId) => {
    const product = products.find((item) => item._id === productId);
    const product_id = product?.product_id;
    if (product_id) {
      router.push(`/product/${product_id}`);
    }
  };

  const handlePayClick = async (orderId) => {
    try {
      // Demande à votre serveur de créer une session de paiement
      const response = await fetch(`${BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const { url } = await response.json();

      if (url) {
        // Redirige l'utilisateur vers Stripe Checkout
        window.location.href = url;
      } else {
        console.error("Erreur lors de la création de la session de paiement");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (!user) return null;

  return (
    <div className={styles["user-account-container"]}>
      <div className={styles["user-menu"]}>
        <aside className={styles["user-account-nav"]}>
          <h2></h2>

          <button
            className={styles.active}
            onClick={() => handleTabClick("favoris")}
          >
            <i className="fa-solid fa-heart"> </i>
            Favoris
          </button>
          {/* <button
            className={styles.active}
            onClick={() => handleTabClick("discounts")}
          >
            <i className="fa-solid fa-percent"></i> Promotions
          </button> */}

          <button
            className={styles.active}
            onClick={() => handleTabClick("commandes")}
          >
            <i className="fa-solid fa-basket-shopping"></i> commandes
          </button>
          <button
            className={styles.active}
            onClick={() => handleTabClick("infos")}
          >
            <i className="fa-solid fa-user-pen"></i> infos
          </button>
        </aside>
      </div>

      <div className={styles["user-dashboard"]}>
        <h3>
          {selectedTab === "favoris" && "Mes produits favoris"}
          {/* {selectedTab === "discounts" && "Mes remises & promotions"} */}
          {selectedTab === "commandes" && "Mes commandes"}
          {selectedTab === "infos" && "Mes informations"}
        </h3>

        {selectedTab === "favoris" && (
          <div className={styles["user-favorites"]}>
            <div className={styles["favorites-grid"]}>
              {favorites?.length > 0 ? (
                favorites.map((favorite) => {
                  const product = products.find(
                    (item) => item._id === favorite.product_id
                  );

                  if (!product) return null;

                  return (
                    <div
                      data-aos="fade-up"
                      key={favorite.product_id}
                      className={styles.productCard}
                    >
                      <ProductCard
                        product={product}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                        checkFavorite={checkFavorite}
                        removeFromFavorites={removeFromFavorites}
                        handleProductClick={handleProductClick}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={styles["no-favorites-msg"]}>
                  <p>Vous n'avez pas encore de produits favoris.</p>
                  <Link href="/boutique">
                    <button>Visiter la boutique</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* {selectedTab === "discounts" && (
          <div data-aos="fade-up" className={styles["user-discounts"]}>
            <div className={styles["grid-discounts"]}>
              {Object.values(discounts).map((discount) => (
                <div key={discount._id} className={styles["discount-card"]}>
                  <h5>{discount.displayedName}</h5>
                  <img
                    src={discount.image}
                    alt={discount.displayedName}
                    className={styles.discountImage}
                  />
                  <p className={styles.discountBadge}>
                    {discount.discountType === "percentage"
                      ? `${discount.discountValue}%`
                      : `${discount.discountValue}€`}
                  </p>
                  <p>
                    {discount.isGlobalDiscount
                      ? "Remise sur toute la boutique"
                      : "PROMOTION"}
                  </p>
                  <p>
                    Validité :{" "}
                    {new Date(discount.startDate).toLocaleDateString()} au{" "}
                    {new Date(discount.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {selectedTab === "commandes" && (
          <div data-aos="fade-up" className={styles["user-orders"]}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div className={styles.order} key={order._id}>
                  <table>
                    <thead>
                      <tr>
                        <th>N° de commande</th>
                        <th>Date</th>
                        <th className={styles.mobile}>Produits</th>
                        <th className={styles.mobile}>Total TTC</th>
                        <th>Détails</th>
                        <th></th>{" "}
                        {/* Ajout de la colonne pour le bouton de paiement */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order._id}</td>
                        <td>
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString()
                            : "Date inconnue"}
                        </td>
                        <td className={styles.mobile}>
                          {order.items.map((product) => (
                            <p key={product._id}>
                              {product.name} <span>x {product.quantity}</span>
                            </p>
                          ))}
                        </td>
                        <td className={styles.mobile}>
                          {order.totalAmount.toFixed(2)} € <br />
                        </td>
                        <td>
                          <Link href={`/mon-compte/commande/${order._id}`}>
                            <button>Voir</button>
                          </Link>
                        </td>
                        <td>
                          {order.status === "pending" && (
                            <button onClick={() => handlePayClick(order._id)}>
                              Payer
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="6">
                          <DeliveryTimeline status={order.status} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div className={styles["no-orders-msg"]}>
                <p>Vous n'avez pas encore effectué de commande.</p>
                <Link href="/boutique">
                  <button>Visiter la boutique</button>
                </Link>
              </div>
            )}
          </div>
        )}

        {selectedTab === "infos" && (
          <div data-aos="fade-up" className={styles["user-infos"]}>
            <div className={styles["grid-infos"]}>
              <div className={styles.activity}>
                <h4>Activité</h4>
                {/* <p>Vous avez {countFavorites} produits dans vos favoris</p> */}
                <p>Vous avez {cartItemsCount} produits dans votre panier</p>
                <p>
                  Vous avez passé {countOrders} commandes depuis votre
                  inscription
                </p>
              </div>
              <div className={styles.perso}>
                <h4>Informations personnelles</h4>
                <p>Nom : {user.lastName}</p>
                <p>Prénom : {user.firstName}</p>
                <p>Entreprise : {user.company}</p>
                <p>
                  Date d'inscription :{" "}
                  {new Date(user.created).toLocaleDateString()}
                </p>
              </div>

              <div className={styles.contact}>
                <h4>Informations de contact</h4>
                <p>Email : {user.email}</p>
                <p>Téléphone : {user.phone}</p>
                <p>
                  Commercial(e) référent(e) : <br /> {user.salesperson}
                </p>
              </div>
            </div>
            <Link href="/mon-compte/modification">
              <button>Modifier</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
