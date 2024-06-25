// utils/withAuth.js
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";

// fonction withAuth pour protéger les routes si le role stocké dans le localStorage n est pas admin

export default function withAuth(Component) {
<<<<<<< HEAD
  return () => {
    const router = useRouter();

    useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        router.push("/connexion");
      }
    }, []);
=======
  return function Auth() {
    const user = useGetUser();
    const router = useRouter();
    const role = user?.role;

    useLayoutEffect(() => {
      if (role !== "admin") {
        router.push("/connexion");
      }
    }, [role, router]);
>>>>>>> e895fee (PriceFilter)

    return <Component />;
  };
}
