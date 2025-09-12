import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";

export default function HomepageCountUp() {
  const animationDuration = 5000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);

  const easeOutQuad = (t) => t * (2 - t);

  const animateCountUp = (el) => {
    let start;
    const countTo = parseInt(el.getAttribute("data-count-to"), 10);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / animationDuration, 1);
      const eased = easeOutQuad(progress);
      el.textContent = Math.floor(countTo * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const containerRef = useRef(null);

  const { t } = useTranslation();

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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

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
                <span className={`${styles.timer}`} data-count-to="20">
                  0
                </span>
                +
              </h3>
              <h4>{t("homepageCountup.partners")}</h4>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.count_box} ${styles.box_hover}`}>
              <h3>
                <span className={`${styles.timer}`} data-count-to="130">
                  0
                </span>
                +
              </h3>
              <h4>{t("homepageCountup.clients")}</h4>
            </div>
          </div>
          <div className={styles.col}>
            <div className={`${styles.count_box} ${styles.box_hover}`}>
              <h3>
                <span className={`${styles.timer}`} data-count-to="700">
                  0
                </span>
                +
              </h3>
              <h4>{t("homepageCountup.projects")}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
