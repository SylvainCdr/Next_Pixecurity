import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

export default function OrderFailed() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/boutique'); // Redirige vers la boutique après 5 secondes
    }, 8000);

    return () => clearTimeout(timer); // Nettoie le timer lorsque le composant est démonté
  }, [router]);

  return (
    <div className={styles["orderFailedContainer"]}>
      <h1>Commande échouée</h1>
      <p>
        Votre commande n'a pas pu être traitée. Veuillez réessayer ou contacter
        notre service client.
      </p>
      <p>Vous allez être redirigé vers la boutique dans quelques secondes</p>
    </div>
  );
}
