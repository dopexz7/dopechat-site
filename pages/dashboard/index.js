import DashboardMain from "../../components/Dashboard/Main/DashboardMain";
import { supabase } from "../../lib/supabaseClient";
import { BrowserView, MobileView } from "react-device-detect";
import { AuthProvider } from "../../contexts/AppContext";

export default function Dashboard(props) {
  return (
    <AuthProvider>
      <BrowserView>
        <DashboardMain data={props.data} />
      </BrowserView>
      <MobileView>
        <div className="h-full w-full flex items-center justify-center text-sm text-black">
          This is unavailable on mobile.
        </div>
      </MobileView>
    </AuthProvider>
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
