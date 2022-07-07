import React, { useContext, useState, useEffect, createContext, FC } from "react";
import { supabase } from "../lib/supabaseClient";
const AuthContext = createContext({});
interface AuthContextProps {
  children: React.ReactNode
}
export const AuthProvider:FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const session : any = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};