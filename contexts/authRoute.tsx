import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const AuthRoute:FC<AuthRouteProps> = ({ children }) => {
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);
  if (!user) return <>
  Access denied.
  <Link href='/' className="ml-1 font-bold text-ma-pink">
    Go back to the home page.
  </Link>
  </>;
  return <>{children}</>;
};

export default AuthRoute;

interface AuthRouteProps {
  children: React.ReactNode;
}