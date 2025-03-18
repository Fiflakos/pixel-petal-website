
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  adminEmails: string[];
};

// List of admin emails - centralized in one place
const adminEmails = ['your@email.com', 'wiktor@admin.pl', 'fili11@op.pl'];

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
  adminEmails,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        // Check if user is an admin
        if (data.session?.user?.email) {
          setIsAdmin(adminEmails.includes(data.session.user.email));
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is an admin
        if (session?.user?.email) {
          const isUserAdmin = adminEmails.includes(session.user.email);
          setIsAdmin(isUserAdmin);
          
          if (isUserAdmin) {
            toast({
              title: "Zalogowano jako administrator",
              description: "Masz dostęp do panelu administracyjnego.",
            });
          }
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Wylogowano pomyślnie",
        description: "Do zobaczenia wkrótce!",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Błąd wylogowania",
        description: "Nie udało się wylogować. Spróbuj ponownie.",
        variant: "destructive"
      });
    }
  };

  const value = {
    session,
    user,
    isAdmin,
    loading,
    signOut,
    adminEmails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
