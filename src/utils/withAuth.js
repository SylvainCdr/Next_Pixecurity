// utils/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";

export default function withAuth(WrappedComponent) {
  return function AuthHOC(props) {
    const [loading, setLoading] = useState(true);
    const user = useGetUser();
    const router = useRouter();
    const role = user?.role;

    useEffect(() => {
      if (loading) return; // Ne rien faire tant que le chargement n'est pas terminé

      if (role && role !== "admin") {
        router.push("/connexion");
      }
    }, [role, router, loading]);

    // Si encore en train de charger les informations sur l'utilisateur, afficher un loader
    if (loading) {
      // Vous pouvez afficher un loader ici si nécessaire
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
