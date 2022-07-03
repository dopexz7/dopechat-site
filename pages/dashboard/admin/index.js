import MainAdmin from "../../../components/DashboardDark/Admin/MainAdmin";
import { AuthProvider } from "../../../contexts/AppContext";

export default function Admin() {
  return (
    <AuthProvider>
      <MainAdmin />
    </AuthProvider>
  );
}
