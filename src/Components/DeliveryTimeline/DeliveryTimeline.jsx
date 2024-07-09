import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Aos from "aos";

export default function DeliveryTimeline({ status }) {
  //aos
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div data-aos="flip-down" className={styles["delivery-timeline"]}>
      <div
        className={`${styles["timeline-item"]} ${status === "paid" ? styles["active"] : ""}`}
      >
        <div className={styles["timeline-circle"]}>1</div>
        <div className={styles["timeline-content"]}>
          <h4>Payé</h4>
          <p> Commande payée </p>
        </div>
      </div>
      <div
        className={`${styles["timeline-item"]} ${status === "pending" ? styles["active"] : ""}`}
      >
        <div className={styles["timeline-circle"]}>2</div>
        <div className={styles["timeline-content"]}>
          <h4>En attente</h4>
          <p>En attente de traitement</p>
        </div>
      </div>
      <div
        className={`${styles["timeline-item"]} ${status === "shipped" ? styles["active"] : ""}`}
      >
        <div className={styles["timeline-circle"]}>3</div>
        <div className={styles["timeline-content"]}>
          <h4>Expédiée</h4>
          <p>Commande expédiée</p>
        </div>
      </div>
      <div
        className={`${styles["timeline-item"]} ${status === "delivered" ? styles["active"] : ""}`}
      >
        <div className={styles["timeline-circle"]}>4</div>
        <div className={styles["timeline-content"]}>
          <h4>Livrée</h4>
          <p>Commande livrée</p>
        </div>
      </div>
    </div>
  );
}
