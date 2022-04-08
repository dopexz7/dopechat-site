import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

const AuthRoute = ({ children }) => {
  const router = useRouter();
  const session = supabase.auth.session();
  useEffect(() => {
    if (!session) {
      router.push("/dashboard");
    }
  });
  if (!session) return <></>;
  return <>{children}</>;
};

export default AuthRoute;
