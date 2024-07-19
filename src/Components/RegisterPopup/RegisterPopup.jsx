import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";
import { useGetUser } from '../useGetUser';

export default function RegisterPopup() {
  const [show, setShow] = useState(false);

  const user = useGetUser();




  useEffect(() => {

    if (user) return; // If the user is already logged in, don't show the popup
    const timer = setTimeout(() => {
      setShow(true);
    },6000); // Adjust the timing as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  function closePopup() {
    setShow(false);
  }

  function redirectToSignup() {
    window.location.href = '/inscription'; // Replace with your signup URL
  }

  if (!show) return null;

  return (
    <div id="signup-popup" className={styles.popup}>
      <div className={styles["popup-content"]}>
        <span className={styles["close-btn"]} onClick={closePopup}>&times;</span>
        <h2>Inscrivez-vous et obtenez <br /><span>-15%</span> </h2>
        <p>Rejoignez notre communauté et profitez d'offres exclusives et de réductions immédiates sur la Boutique en ligne.</p>
        <button onClick={redirectToSignup}>Inscrivez-vous maintenant</button>
      </div>
    </div>
  );
}
