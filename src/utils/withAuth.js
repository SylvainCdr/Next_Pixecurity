import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";

export default function withAuth(Component) {
  return function AuthHOC(props) {
    const [loading, setLoading] = useState(true);
    const user = useGetUser();
    const router = useRouter();
    const role = user?.role;

    useEffect(() => {
      if (!user) {
        setLoading(true);
      } else {
        setLoading(false);
        if (role !== "admin") {
          router.push("/connexion");
        }
      }
    }, [user, role, router]);

    if (loading) {
      return <div>Loading...</div>; // Vous pouvez personnaliser ce loader
    }

    return <Component {...props} />;
  };
}
