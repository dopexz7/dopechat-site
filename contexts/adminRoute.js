import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import useIsMod from "../funcs/useIsMod";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const session = supabase.auth.session();
  const isMod = useIsMod(session?.user?.user_metadata.name);

  useEffect(() => {
    if (!session) {
      router.push("/dashboard");
      setLoading(false);
    }
    if (isMod === false) setLoading(false);
    if (session && isMod === true) {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <div className="w-screen h-screen bg-accent-white flex flex-col space-y-3 items-center justify-center">
        <CircularProgress className="!w-5 !h-5 !text-main-purple" />
      </div>
    );
  } else if (!session || isMod === false)
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
