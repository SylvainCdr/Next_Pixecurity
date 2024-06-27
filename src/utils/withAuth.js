// utils/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";

// fonction withAuth pour protéger les routes si le role stocké dans le localStorage n est pas admin

export default function withAuth(Component) {


  return function Auth() {
    const user = useGetUser();
    const router = useRouter();
    const role = user?.role;
    console.log("role", );

    useEffect(() => {
      if (role && role !== "admin") {
        router.push("/connexion");
      }
    }, [role, router]);


    return <Component />;
  };
}
