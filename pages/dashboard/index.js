import React, { useEffect, useState } from "react";
import DashboardMain from "../../components/Dashboard/Main/DashboardMain";
import { supabase } from "../../lib/supabaseClient";
import { BrowserView, MobileView } from "react-device-detect";
export default function Dashboard(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserView>
        <DashboardMain data={props.data} session={session} />
      </BrowserView>
      <MobileView>
        <div className="h-full w-full flex items-center justify-center text-sm text-black">
          This is unavailable on mobile.
        </div>
      </MobileView>
    </>
  );
}
export const getStaticProps = async () => {
  let { data, error } = await supabase
    .from("allemotes")
    .select("*")
    .order("date", { ascending: false });
  if (error) console.log(error);
  return {
    props: { data },
  };
};
