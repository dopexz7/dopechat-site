import React from "react";
import EmotePageMain from '../../../components/DashboardDark/EmotePage/EmotePageMain'
import DashboardLayout from "components/DashboardDark/Main/DashboardLayout";
import AuthRoute from "contexts/authRoute";
const EmotePage = () => {
  return (    
    <DashboardLayout>
        <AuthRoute>
        <EmotePageMain />
        </AuthRoute>
    </DashboardLayout>
        
  );
}

export default EmotePage;
