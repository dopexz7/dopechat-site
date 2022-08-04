import { getAvailEdits } from "funcs/useHasEdits";
import { getIsDonor } from "funcs/useIsDonor";
import { getIsMod } from "funcs/useIsMod";
import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  FC,
} from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({});

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMod, setIsMod] = useState<boolean>(false);
  const [isDonor, setIsDonor] = useState<boolean>(false);
  const [availEdits, setAvailEdits] = useState<string[]>([]);
  useEffect(() => {
    getIsMod(user?.user_metadata.name).then((res: any) => {
      setIsMod(res);
    });
    getIsDonor(user?.user_metadata.name).then((res: any) => {
      setIsDonor(res);
    });
    getAvailEdits(user?.user_metadata.name).then((res: any[]) => {
      setAvailEdits(res);
    });
  }, [user]);

  useEffect(() => {
    const session: any = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
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
    isMod,
    isDonor,
    availEdits
  };

  return (
    <>
      {loading ? (
        <div className="overflow-hidden bg-header-bg bg-main-purple bg-blend-multiply h-screen w-screen flex flex-col justify-center items-center">
          Loading
        </div>
      ) : (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextProps {
  children: React.ReactNode;
}
