// utils/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";

// fonction withAuth pour protéger les routes si le role stocké dans le localStorage n est pas admin 

export default function withAuth(Component) {
    return () => {
        const router = useRouter();
    
        useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/connexion");
        }
        }, []);
    
        return <Component />;
    };
    }





