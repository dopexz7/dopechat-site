import AuthRoute from "../../../contexts/authRoute";

import { AuthProvider } from "../../../contexts/AppContext";
import SetsMain from "../../../components/Dashboard/Sets/SetsMain";

export default function Set(props) {
  return (
    <AuthProvider>
      <AuthRoute>
        <SetsMain data={props.data} />
      </AuthRoute>
    </AuthProvider>
  );
}

export const getServerSideProps = async () => {
  const data = await fetch(
    "https://emxllayyisdskjtscvck.supabase.co/rest/v1/useremotes?select=*",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwODgxNDMsImV4cCI6MTk2MjY2NDE0M30.-AGqiBqpHvuSGzlp3WPLwBfrUXu7hk0wl5OkH9AQjvI",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzA4ODE0MywiZXhwIjoxOTYyNjY0MTQzfQ.A4onJm_IC2wRv1ATjlSGzI62msRjZ8V3p0KeL9I3bQg",
      },
    }
  ).then((response) => response.json());
  return {
    props: { data },
  };
};
