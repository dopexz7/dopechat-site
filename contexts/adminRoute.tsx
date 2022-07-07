import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import useIsMod from "../funcs/useIsMod";
import { useAuth } from "./AppContext";

const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth() as any;
  const router = useRouter();
  const isMod = useIsMod();

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
    }
  });
  if (!user || isMod === false) return <></>;
  return <>{children}</>;
};

export default AdminRoute;

interface AdminRouteProps {
  children: React.ReactNode;
}
