"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: Session["user"] | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    async function initializeAuth() {
      try {
        if (!supabaseRef.current) {
          supabaseRef.current = createClient();
        }

        const { data } = await supabaseRef.current.auth.getSession();
        setSession(data.session);

        const {
          data: { subscription },
        } = supabaseRef.current.auth.onAuthStateChange((event, session) => {
          setSession(session);
        });

        return () => {
          subscription?.unsubscribe();
        };
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    const unsubscribe = initializeAuth();
    return () => {
      unsubscribe?.then((fn) => fn?.());
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    const { error } = await supabaseRef.current.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    const { error } = await supabaseRef.current.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    const { error } = await supabaseRef.current.auth.signOut();
    if (error) throw error;
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        signUp,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
