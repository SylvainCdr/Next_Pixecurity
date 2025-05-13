import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import AOS from "aos";
import { useEffect } from "react";

export default function Rse() {
  const { t } = useTranslation();

    useEffect(() => {
      AOS.init({
        duration: 2000,
      });
    }, []);

  return (
    <div className={styles.rseContainer}>
      <div className={styles.section1}>
        <div data-aos="fade-up-right" className={styles.section1content}>
          <h1>Notre engagement pour un avenir durable</h1>
          <p>
              Chez Pixecurity, nous sommes convaincus qu’une entreprise performante doit aussi être exemplaire sur le plan éthique et environnemental. 
  C’est pourquoi nous avons fait de la Responsabilité Sociétale des Entreprises (RSE) un pilier de notre stratégie. 
  Chaque décision, chaque action est pensée pour contribuer à un avenir plus durable, en accord avec nos valeurs d'intégrité, d'innovation et de respect.
          </p>
          <p>
  Notre démarche s’inscrit dans une logique d’amélioration continue, guidée par l’impact que nous souhaitons avoir sur notre environnement, nos collaborateurs et la société dans son ensemble.
</p>
          {/* <p className={styles.quote}>
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.ue.
            Commodi, quidem." <br />
            <Image
              src="https://uploads.pixecurity.com/files/boy.png"
              alt="pixecurity"
              width={40}
              height={40}
            />
            <span>Yann Duchet, CEO </span>
          </p> */}

          {/* <div className={styles.mouseScrollCont}>
            <div className={styles.mouse}></div>
          </div> */}
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.section2content}>
          <h2> Nos actions pour l’environnement</h2>
          <p>
            Nous sommes convaincus que chaque geste compte. C’est pourquoi nous
            avons engagé une démarche concrète pour limiter notre impact
            écologique, au quotidien comme dans notre développement.
          </p>
        </div>

        <div className={styles.ourActions}>
          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://t3.ftcdn.net/jpg/03/98/50/44/240_F_398504440_8mgFm6ZDIIjBL7wa7GUA9WkmoEQ03bb2.jpg"
              alt=""
              loading="lazy"
            />
            <h3>Réduction des déchets</h3>
            <ul>
              <li>Suppression des gobelets en carton jetables.</li>
              <li>
                Mise en place d’une machine à café à grains, réduisant l’usage
                de capsules polluantes.
              </li>
              <li>
                Encouragement à l’usage de mugs et gobelets réutilisables pour
                les collaborateurs.
              </li>
              <li>
                Tri sélectif actif : différentes poubelles sont disponibles pour
                le plastique, le carton, le verre ...
              </li>
            </ul>
          </div>

          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/14/09/32/26/1000_F_1409322651_KETG9UN36kTObUNo3lXHtdFd3hSWYSKt.jpg"
              alt=""
              loading="lazy"
            />
            <h3>Réduction de la consommation de plastique</h3>
            <p>
              {" "}
              <ul>
                <li>
                  Installation d’une station de filtration d’eau reliée à l’eau
                  de ville.
                </li>
                <li>
                  Disparition des bouteilles plastiques dans les bureaux :
                  chacun dispose d’une gourde ou d’un contenant durable.
                </li>
              </ul>
            </p>
          </div>

          <div data-aos="fade-up" className={styles.actionCards}>
            <img
              src="https://t4.ftcdn.net/jpg/14/61/49/55/240_F_1461495576_aQonkrkctxjWDXx7MPlDNje9iOLS5jpu.jpg"
              alt=""
              loading="lazy"
            />
            <h3>Mobilité responsable</h3>
            <p>
              {" "}
              <ul>
                <li>
                  Transition progressive vers un parc automobile 100 %
                  électrique.
                </li>
                <li>
                  Mise en place d’un suivi des émissions de CO₂ évitées, pour
                  quantifier notre impact positif.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section3}>
        <div className={styles.section3content}>
          <h2>Bien-être, inclusion et engagement social</h2>
          <p>
            Nous plaçons l’humain au cœur de notre projet d’entreprise. Un
            environnement sain, inclusif et motivant est essentiel à la
            performance collective.
          </p>
          <div className={styles.section3grid}>
            <div className={styles.section3left}>
              <h3>Bien-être au travail</h3>
              <ul>
                <li>Espaces de pause et de détente aménagés.</li>
                <li>Horaires flexibles et possibilité de télétravail.</li>
                <li>
                  Accès à la formation continue pour favoriser l’évolution
                  professionnelle.
                </li>
              </ul>
            </div>

            <div className={styles.section3right}>
              <h3>Diversité et inclusion</h3>

              <ul>
                <li>
                  Recrutement fondé sur les compétences et l’égalité des
                  chances.
                </li>
                <li>
                  Sensibilisation interne aux biais et comportements
                  discriminants.
                </li>
                <li>Zéro tolérance face aux discriminations.</li>
                <li>Valorisation des différences et des parcours.</li>
              </ul>
            </div>
          </div>
         
        </div>
      </div>

      <div className={styles.section4}>
        <div data-aos="flip-left" className={styles.section4content}>
          <h2>Une démarche en constante évolution</h2>
          <p>
            Nous savons que la RSE n’est pas une finalité mais un chemin. C’est
            pourquoi nous continuons à identifier les leviers d’amélioration
            pour limiter notre empreinte et agir de manière toujours plus
            responsable.
          </p>
        </div>
      </div>
    </div>
  );
}
