import { projects } from "./projectsData";
import styles from "./style.module.scss";
import Head from "next/head";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Nos Réalisations - Pixecurity</title>
        <meta
          name="description"
          content="Découvrez quelques-uns de nos projets emblématiques en France."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className={styles.projectsPage}>
        <h1>Nos Réalisations</h1>
        <p>Découvrez quelques-uns de nos projets emblématiques en France</p>

        <div className={styles.projectsGrid}>
          {projects.map((p) => (
            <div key={p.slug} className={styles.projectsCard}>
              <div className={styles.imageWrapper}>
                <img src={p.images[0]} alt={p.name} />
                <div className={styles.overlay}>
                  <span>{p.category}</span>
                </div>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <span>
                {p.client} - {p.year}
              </span>
              <div className={styles.projectTags}>
                {p.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* <a href={p.website} className={styles.projectLink}>
              Voir le projet
            </a> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
