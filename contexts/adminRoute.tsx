import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getIsMod } from "../funcs/useIsMod"; 
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
 
const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const user = useUser();
  const router = useRouter();
  const [mod, setMod] = useState<boolean>(false)

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
    getIsMod(user?.user_metadata.name).then((res: any) => { setMod(res)});
  }, [user]);
  
  if (!user || mod === false) return <>
  Access denied.
  <Link href='/' className="ml-1 font-bold text-ma-pink">
    Go back to the home page.
  </Link>
  </>;;
  return <>{children}</>;
};

export default AdminRoute;

interface AdminRouteProps {
  children: React.ReactNode;
}
