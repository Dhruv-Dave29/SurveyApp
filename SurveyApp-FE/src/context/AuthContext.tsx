import { supabase } from "@/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import { type ReactNode } from "react";
import { type Session } from '@supabase/supabase-js';

// Define the context type
interface AuthContextType {
  session: Session | null;
  signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any }>;
  signInUser: (credentials: SignInCredentials) => Promise<{ success: boolean; error?: any; data?: any }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sign up
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error('There was a problem signing up', error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Sign in
  const signInUser = async ({ email, password }: SignInCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) {
        console.error('Sign in error', error);
        return { success: false, error: error };
      }
      
      console.log('Sign in success', data);
      return { success: true, data };
    } catch (error) {
      console.error("Error signing in", error);
      return { success: false, error };
    }
  }

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);
  
  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, session, signUpNewUser, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};