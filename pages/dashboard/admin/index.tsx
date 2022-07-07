import React, { FC } from "react";
import MainAdmin from "../../../components/DashboardDark/Admin/MainAdmin";
import { AuthProvider } from "../../../contexts/AppContext";

const Admin:FC = () => {
  return (
    <AuthProvider>
      <MainAdmin />
    </AuthProvider>
  );
}

export default Admin;
