import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { useGetUser } from "../useGetUser";
import { useCartContext } from "@/Components/cartContext";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'; // Importer useRouter pour accéder à la route actuelle
import i18next from "i18next";

function Header() {
  const user = useGetUser();
  const pathname = usePathname();
  const { t } = useTranslation();
  const router = useRouter(); // Obtenir la route actuelle

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
      title: t('logoutTitle'),  // "Déconnecté"
      icon: "success",
      text: t('logoutText'),  // "Pixecurity vous remercie pour votre visite !"
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

// Vérifiez que pathname est défini avant d'utiliser startsWith
const shouldDisplayLanguageSelector = pathname && !pathname.startsWith('/boutique') && !pathname.startsWith('/panier') && !pathname.startsWith('/mon-compte') && !pathname.startsWith('/admin') && !pathname.startsWith('/inscription') && !pathname.startsWith('/connexion') && !pathname.startsWith('/inscription'); 


  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
  };

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
              {t('header.shop')}  {/* Boutique */}
            </Link>
          </li>
          <li className={pathname === "/notre-expertise" ? styles.active : ""}>
            <Link href="/notre-expertise" onClick={handleLinkClick}>
              {t('header.Expertise')}  {/* Notre expertise */}
            </Link>
          </li>
          <li className={pathname === "/partenaires" ? styles.active : ""}>
            <Link href="/partenaires" onClick={handleLinkClick}>
              {t('header.ourPartners')}  {/* Nos partenaires */}
            </Link>
          </li>
          <li className={pathname === "/a-propos" ? styles.active : ""}>
            <Link href="/a-propos" onClick={handleLinkClick}>
              {t('header.about')}  {/* Qui sommes-nous ? */}
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
                {t('header.login')}  {/* Connexion */}
              </Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className={pathname === "/mon-compte" ? styles.active : ""}>
              <Link href="/mon-compte" onClick={handleLinkClick}>
                {t('header.myAccount')}  {/* Mon compte */}
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li
              className={pathname === "/admin/dashboard" ? styles.active : ""}
            >
              <Link href="/admin/dashboard" onClick={handleLinkClick}>
                {t('header.admin')}  {/* Administration */}
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="#" onClick={logout} className={styles.logout}>
                {t('header.logout')}  {/* Déconnexion */}
              </Link>
            </li>
          )}

  
        </ul>

        <div className={styles.header__burgerMenu} onClick={burgerToggle} />

        {user?.role === "user" && <CartLink />}

                {/* Sélecteur de langue */}
      {shouldDisplayLanguageSelector && (
        <div className={styles.language_selector}>
          <button onClick={() => changeLanguage('fr')} className={styles.lang_button}>
            <img src="/assets/icons/french-logo.png" alt="French" />
          </button>
          <button onClick={() => changeLanguage('en')} className={styles.lang_button}>
            <img src="/assets/icons/english-logo.png" alt="English" />
          </button>
        </div>
      )}
      </nav>
    </div>
  );
}

function CartLink() {
  const { cartItemsCount } = useCartContext();
  const { t } = useTranslation();

  return (
    <Link className={styles.cart} href="/panier">
      <p className={styles.count}>{cartItemsCount}</p>
      <i className="fa-solid fa-cart-shopping"></i>
    </Link>
  );
}

export default Header;


