import { useEffect } from 'react';
import { useRouter } from 'next/router';

// fonction pour gérer les erreurs 404 et 500
// et rediriger vers la page boutique

function CustomErrorPage({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && (statusCode === 500 || statusCode === 404)) {
      router.push('/boutique');
    }
  }, [statusCode, router]);

  if (statusCode === 500 || statusCode === 404) {
    return null; // Empêche l'affichage si on redirige
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Erreur {statusCode}</h1>
      <p>Retour à la <a href="/">page d'accueil</a>.</p>
    </div>
  );
}

CustomErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;

  // Redirection serveur pour 404 et 500
  if (res && (statusCode === 500 || statusCode === 404)) {
    res.writeHead(302, { Location: '/boutique' });
    res.end();
  }

  return { statusCode };
};

export default CustomErrorPage;
