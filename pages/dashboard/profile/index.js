import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import { AuthProvider } from "../../../contexts/AppContext";
import { supabase } from "../../../lib/supabaseClient";

export default function Profile(props) {
  return (
    <AuthProvider>
      <MainProfile data={props.data} />
    </AuthProvider>
  );
}

export const getServerSideProps = async () => {
  let { data, error } = await supabase.from("allemotes").select("*");
  if (error) console.log(error);
  return {
    props: { data },
  };
};
