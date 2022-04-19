import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AppContext";
const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
    }
  });
  if (!user) return <></>;
  return <>{children}</>;
};

export default AuthRoute;
