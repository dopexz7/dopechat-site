import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

const AdminRoute = ({ children }) => {
  const router = useRouter();
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
    });

    if (!session) {
      router.push("/dashboard");
    }
  }, [session, mod]);
  if (!session || mod === false)
    return (
      <div className="w-screen h-screen bg-darker-purple flex flex-col space-y-3 items-center justify-center">
        <div className="text-white">Not authorized.</div>
        <Link href="/dashboard" passHref>
          <div className="hover:bg-white hover:text-main-purple duration-300 cursor-pointer text-white bg-main-purple font-medium p-3 rounded-3xl">
            Back to dashboard
          </div>
        </Link>
      </div>
    );
  return <>{children}</>;
};

export default AdminRoute;
