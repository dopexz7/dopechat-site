import React from "react";
import { FC } from "react";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";
import MainProfile from "../Profile/MainProfile";
const DashboardMain: FC = () => {
  const [editingSet, setEditingSet] = useState<string>("");
  const [profile, setProfile] = useState<boolean>(false);
  return (
    <DashboardLayout title="Dashboard" layout="dashboard">
      {profile ? (
        <MainProfile />
      ) : (
        <DashboardMiddleSection editingSet={editingSet} />
      )}
      <DashboardLeftSignedIn
        route={profile}
        onRouteChange={(): any => setProfile(!profile)}
        onSuccess={(x: string): any => setEditingSet(x)}
      />
    </DashboardLayout>
  );
};
export default DashboardMain;
