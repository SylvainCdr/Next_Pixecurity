import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import { useGetUser } from '../useGetUser';

export default function RegisterPopup() {
  const [show, setShow] = useState(false);
  const user = useGetUser();

  useEffect(() => {
    if (user) return; // Si l'utilisateur est déjà connecté, ne pas afficher le pop-up

    const maxDisplaysPerHour = 2;
    const displayCount = parseInt(localStorage.getItem('popupDisplayCount')) || 0;
    const lastDisplayTime = parseInt(localStorage.getItem('popupLastDisplayTime')) || 0;
    const currentTime = new Date().getTime();

    const oneHourInMilliseconds = 3600000;

    if (displayCount >= maxDisplaysPerHour && (currentTime - lastDisplayTime < oneHourInMilliseconds)) {
      return; // Si le pop-up a été affiché 2 fois dans la dernière heure, ne pas l'afficher
    }

    if (currentTime - lastDisplayTime >= oneHourInMilliseconds) {
      localStorage.setItem('popupDisplayCount', 0); // Réinitialiser le compteur si une heure s'est écoulée
    }

    const timer = setTimeout(() => {
      setShow(true);
      localStorage.setItem('popupDisplayCount', displayCount + 1);
      localStorage.setItem('popupLastDisplayTime', currentTime);
    }, 6000); // Ajustez le timing si nécessaire

    return () => clearTimeout(timer); // Nettoyer le timer à la destruction du composant
  }, [user]);

  function closePopup() {
    setShow(false);
  }

  function redirectToSignup() {
    window.location.href = '/inscription'; // Remplacez par votre URL d'inscription
  }

  if (!show) return null;

  return (
    <div id="signup-popup" className={styles.popup}>
      <div className={styles["popup-content"]}>
        <span className={styles["close-btn"]} onClick={closePopup}>&times;</span>
        <h2>Inscrivez-vous et obtenez <br /><span>-15%</span></h2>
        <p>Rejoignez notre communauté et profitez d'offres exclusives et de réductions immédiates sur la Boutique en ligne.</p>
        <button onClick={redirectToSignup}>Inscrivez-vous maintenant</button>
      </div>
    </div>
  );
}
