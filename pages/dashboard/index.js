import DashboardMain from "../../components/Dashboard/Main/DashboardMain";
import { supabase } from "../../lib/supabaseClient";
import { AuthProvider } from "../../contexts/AppContext";
export default function Dashboard(props) {
  return (
    <AuthProvider>
      <DashboardMain data={props.data} />
    </AuthProvider>
  );
}
export const getServerSideProps = async () => {
  let { data, error } = await supabase
    .from("allemotes")
    .select("*")
    .order("date", { ascending: false });
  if (error) console.log(error);
  return {
    props: { data },
  };
};
