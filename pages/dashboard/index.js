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

  // const data = await fetch(
  //   "https://emxllayyisdskjtscvck.supabase.co/rest/v1/allemotes?select=*",
  //   {
  //     headers: {
  //       apikey:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwODgxNDMsImV4cCI6MTk2MjY2NDE0M30.-AGqiBqpHvuSGzlp3WPLwBfrUXu7hk0wl5OkH9AQjvI",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzA4ODE0MywiZXhwIjoxOTYyNjY0MTQzfQ.A4onJm_IC2wRv1ATjlSGzI62msRjZ8V3p0KeL9I3bQg",
  //       Range: "0-36",
  //     },
  //   }
  // ).then((response) => response.json());

  return {
    props: { data },
  };
};
