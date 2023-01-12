import React from "react";
import MainAdmin from "../../../components/DashboardDark/Admin/MainAdmin";
import Head from "next/head";

const Admin = () => {
  return (
    <>
    <Head>
      <title>Admin page</title>
      <meta name="description" content="Facebook Gaming extension dopeChat" />
    </Head>
      <MainAdmin />
    </>
  );
}

export default Admin;
