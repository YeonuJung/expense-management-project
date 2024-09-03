import { createContext, useState, useEffect, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../api/base";

const AuthContext = createContext<Session | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};
