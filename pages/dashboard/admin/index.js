import MainAdmin from "../../../components/Dashboard/Admin/MainAdmin";
import { AuthProvider } from "../../../contexts/AppContext";

export default function Admin() {
  return (
    <AuthProvider>
      <MainAdmin />
    </AuthProvider>
  );
}
