import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getIsMod } from "../funcs/useIsMod"; 
import { useAuth } from "./AppContext";

const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth() as any;
  const router = useRouter();
  const [mod, setMod] = useState<boolean>(false)

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
    }
    getIsMod(user?.user_metadata.name).then((res: any) => { setMod(res)});
  }, [user]);
  
  if (!user || mod === false) return <></>;
  return <>{children}</>;
};

export default AdminRoute;

interface AdminRouteProps {
  children: React.ReactNode;
}
