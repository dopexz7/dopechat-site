import AuthRoute from "../../../contexts/authRoute";
import { AuthProvider } from "../../../contexts/AppContext";
import SetsMain from "../../../components/DashboardDark/Sets/SetsMain";
import { FC } from "react";
import React from "react";


const Set:FC = () => {
  return (
    <AuthProvider>
      <AuthRoute>
        <SetsMain />
      </AuthRoute>
    </AuthProvider>
  );
}

export default Set;
