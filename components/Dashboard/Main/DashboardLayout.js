import Head from "next/head";
import DashboardNav from "../Nav/DashboardNav";
import DashboardLeftSection from "./DashboardLeftSection";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const DashboardLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="overflow-hidden h-screen w-screen flex flex-col justify-center items-center bg-main-purple bg-header-bg bg-blend-multiply">
        <DashboardNav session={props.session} />

        <div className="overflow-hidden w-full h-full flex flex-row bg-accent-white">
          <QueryClientProvider client={queryClient}>
            <DashboardLeftSection session={props.session} />
          </QueryClientProvider>

          {props.children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
