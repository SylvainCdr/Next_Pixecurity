import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { useGetUser } from "../useGetUser";
import { useCartContext } from "@/Components/cartContext";

function Header() {
  const user = useGetUser();

  function burgerToggle() {
    const nav = document.querySelector(`.${styles.header__nav}`);
    const burgerMenu = document.querySelector(`.${styles.header__burgerMenu}`);
    nav.classList.toggle(styles.active);
    burgerMenu.classList.toggle(styles.active);
  }

  const handleLinkClick = () => {
    const nav = document.querySelector(`.${styles.header__nav}`);
    const burgerMenu = document.querySelector(`.${styles.header__burgerMenu}`);
    if (nav.classList.contains(styles.active)) {
      nav.classList.remove(styles.active);
      burgerMenu.classList.remove(styles.active);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    Swal.fire({
      title: "Déconnecté",
      icon: "success",
      text: "Pixecurity vous remercie pour votre visite !",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const pathname = usePathname();

  return (
    <div className={styles.header_container}>
      <nav className={styles.header__nav}>
        <div className={styles.header__logo}>
          <Link href="/">
            <img src="/assets/logo-dark.svg" alt="Logo Pixecurity" />
          </Link>
        </div>

        <ul>
          <li className={pathname === "/boutique" ? styles.active : ""}>
            <Link
              href={`/boutique${user?._id ? `?userId=${user?._id}` : ""}`}
              className={styles.shop}
              onClick={handleLinkClick}
            >
              Boutique
            </Link>
          </li>
          <li className={pathname === "/notre-expertise" ? styles.active : ""}>
            <Link href="/notre-expertise" onClick={handleLinkClick}>
              Notre expertise
            </Link>
          </li>
          <li className={pathname === "/partenaires" ? styles.active : ""}>
            <Link href="/partenaires" onClick={handleLinkClick}>
              Nos partenaires
            </Link>
          </li>
          <li className={pathname === "/a-propos" ? styles.active : ""}>
            <Link href="/a-propos" onClick={handleLinkClick}>
              Qui sommes-nous ?
            </Link>
          </li>
          {!user && (
            <li
              className={
                pathname === "/inscription" || pathname === "/connexion"
                  ? styles.active
                  : ""
              }
            >
              <Link href="/inscription" onClick={handleLinkClick}>
                Connexion
              </Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className={pathname === "/mon-compte" ? styles.active : ""}>
              <Link href="/mon-compte" onClick={handleLinkClick}>
                Mon compte
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li
              className={pathname === "/admin/dashboard" ? styles.active : ""}
            >
              <Link href="/admin/dashboard" onClick={handleLinkClick}>
                Administration
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="#" onClick={logout} className={styles.logout}>
                Déconnexion
              </Link>
            </li>
          )}
        </ul>

        <div className={styles.header__burgerMenu} onClick={burgerToggle} />

        {user?.role === "user" && <CartLink />}
      </nav>
    </div>
  );
}

function CartLink() {
  const { cartItemsCount } = useCartContext();
  return (
    <Link className={styles.cart} href="/panier">
      <p className={styles.count}>{cartItemsCount}</p>
      <i className="fa-solid fa-cart-shopping"></i>
    </Link>
  );
}

export default Header;
