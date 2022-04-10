import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const session = supabase.auth.session();
  const [mod, setMod] = useState(false);
  const checkMod = async () => {
    let { data: mods, error } = await supabase
      .from("mods")
      .select("*")
      .eq("name", session.user.user_metadata.name); //session.user.user_metadata.name
    if (mods.length) return true;
    return false;
  };

  useEffect(() => {
    checkMod().then((res) => {
      setMod(res);
      if (res === false) setLoading(false);
      if (session && res === true) {
        setLoading(false);
      }
    });

    if (!session) {
      router.push("/dashboard");
      setLoading(false);
    }

    //setLoading(false);
  }, [session, mod]);
  if (loading) {
    return (
      <div className="w-screen h-screen bg-accent-white flex flex-col space-y-3 items-center justify-center">
        <CircularProgress className="!w-5 !h-5 !text-main-purple" />
      </div>
    );
  } else if (!session || mod === false)
    return (
      <div className="w-screen h-screen bg-accent-white flex flex-col space-y-3 items-center justify-center">
        <div className="text-accent-purple text-xl">Not authorized.</div>
        <Link href="/dashboard" passHref>
          <div className="hover:bg-white hover:text-main-purple duration-300 cursor-pointer text-white bg-accent-purple font-medium p-3 rounded-3xl">
            Back to dashboard
          </div>
        </Link>
      </div>
    );
  return <>{children}</>;
};

export default AdminRoute;
