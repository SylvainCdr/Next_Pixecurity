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
      console.log('User:', user);
      console.log('Role:', role);
      if (role === "null") {
        setLoading(true);
      } else {
        setLoading(false);
        if (role !== "admin") {
          router.push("/");
        }
      }
    }, [user, role, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}