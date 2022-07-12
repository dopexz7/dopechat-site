import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AppContext";

const AuthRoute:FC<AuthRouteProps> = ({ children }) => {
  const { user } = useAuth() as any;
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