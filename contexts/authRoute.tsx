import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

const AuthRoute:FC<AuthRouteProps> = ({ children }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
    }
  }, []);

  if (!user) return <></>;
  return <>{children}</>;
};

export default AuthRoute;

interface AuthRouteProps {
  children: React.ReactNode;
}