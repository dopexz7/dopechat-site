import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import useIsMod from "../funcs/useIsMod";
import { useAuth } from "./AppContext";
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const session = supabase.auth.session();
  const isMod = useIsMod(user.user_metadata.name);

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
      setLoading(false);
    }
    if (isMod === false) setLoading(false);
    if (user && isMod === true) {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <div className="w-screen h-screen bg-accent-white flex flex-col space-y-3 items-center justify-center">
        <CircularProgress className="!w-5 !h-5 !text-main-purple" />
      </div>
    );
  } else if (!user || isMod === false)
    return (
      <div className="w-screen h-screen bg-accent-white flex flex-col space-y-3 items-center justify-center">
        <div className="text-accent-purple text-xl">
          Looks like you wandered somewhere you shouldn&apos;t be.
        </div>
        <Link href="/dashboard" passHref>
          <div className="hover:text-main-purple duration-300 cursor-pointer text-accent-gray font-medium">
            Back to dashboard
          </div>
        </Link>
      </div>
    );
  return <>{children}</>;
};

export default AdminRoute;
