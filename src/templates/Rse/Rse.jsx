import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function Rse() {
  const { t } = useTranslation();

  return (
    <div className={styles.rseContainer}>
      <div className={styles.section1}>
        <div className={styles.section1content}>
          <h1>Notre engagement pour un avenir durable</h1>
          <p>
            Chez Pixecurity, nous croyons qu’une entreprise performante se doit
            aussi d’être responsable. C’est pourquoi nous intégrons les enjeux
            environnementaux et sociétaux dans nos choix quotidiens. Notre
            politique RSE s’inscrit dans une volonté de progrès continu, en
            cohérence avec nos valeurs et nos missions.
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
          <div className={styles.actionCards}>
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

          <div className={styles.actionCards}>
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

          <div className={styles.actionCards}>
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
          <h2> Engagement social et bien-être des collaborateurs</h2>

          <ul>
            <li> Environnement de travail sain et respectueux.</li>
            <li>
              Sensibilisation aux éco-gestes et formations internes ponctuelles
              sur les enjeux environnementaux.
            </li>
            <li>
              Soutien à l’égalité des chances : recrutement basé sur les
              compétences, sans discrimination.
            </li>
            <li>
              Accompagnement professionnel : accès à la formation continue pour
              tous les collaborateurs.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section4}>
        <div className={styles.section4content}>
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
