import React, { FC } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const AuthRoute:FC<AuthRouteProps> = ({ children }) => {
  const user = useUser();
  if (!user) return <>
  Access denied. Login or 
  <Link href='/' className="ml-1 font-bold text-ma-pink">
    go back to the home page.
  </Link>
  </>;
  return <>{children}</>;
};

export default AuthRoute;

interface AuthRouteProps {
  children: React.ReactNode;
}