import AuthRoute from "../../../contexts/authRoute";
import SetsMain from "../../../components/DashboardDark/Sets/SetsMain";
import { FC } from "react";
import React from "react";

const Set:FC = () => {
  return (    
      <AuthRoute>
        <SetsMain />
      </AuthRoute>
  );
}

export default Set;
