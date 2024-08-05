import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";

export default function HomepageCountUp() {
  const animationDuration = 5000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);

  const easeOutQuad = (t) => t * (2 - t);

  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.getAttribute("data-count-to"), 10);
    el.innerHTML = "0"; // Initialiser à zéro au début

    console.log(`Animating count up to: ${countTo}`);

    const counter = setInterval(() => {
      frame++;

      const progress = easeOutQuad(frame / totalFrames);

      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // utilise le viewport comme root
      rootMargin: "0px",
      threshold: 0.1, // déclenche quand 10% de l'élément est visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const countupEls = entry.target.querySelectorAll(`.${styles.timer}`);
          console.log(`Found ${countupEls.length} elements to animate.`);
          countupEls.forEach(animateCountUp);
          observer.unobserve(entry.target); // arrêter d'observer après l'animation
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.counter_wrapper}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={`${styles.count_box} ${styles.box_hover}`}>
              <h3>
                <span className={`${styles.timer}`} data-count-to="20">0</span>+
              </h3>
              <h4>Partenaires</h4>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.count_box} ${styles.box_hover}`}>
              <h3>
                <span className={`${styles.timer}`} data-count-to="110">0</span>+
              </h3>
              <h4>Clients</h4>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.count_box} ${styles.box_hover}`}>
              <h3>
                <span className={`${styles.timer}`} data-count-to="600">0</span>+
              </h3>
              <h4>Projets</h4>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
