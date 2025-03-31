import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function CustomErrorPage({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && (statusCode === 500 || statusCode === 404)) {
      router.push('/boutique');
    }
  }, [statusCode, router]);

  if (statusCode === 500 || statusCode === 404) {
    return null;
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Erreur {statusCode}</h1>
      <p>Retour à la <Link href="/">page d'accueil</Link>.</p>
    </div>
  );
}

CustomErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;

  if (res && (statusCode === 500 || statusCode === 404)) {
    res.writeHead(302, { Location: '/boutique' });
    res.end();
  }

  return { statusCode };
};

export default CustomErrorPage;
