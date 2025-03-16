import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // List of admin emails - add your email here
  const adminEmails = ['your@email.com', 'fili11@op.pl']; // Added your email to the admins list

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Check if user email is in admin list
        const userEmail = data.session.user.email;
        if (userEmail && adminEmails.includes(userEmail)) {
          setIsAuthenticated(true);
          navigate('/admin/dashboard');
        } else {
          // Not an admin, sign them out
          await supabase.auth.signOut();
          toast({
            title: "Brak uprawnień",
            description: "Tylko administratorzy mają dostęp do panelu.",
            variant: "destructive"
          });
        }
      }
    };
    
    checkSession();
  }, [navigate, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Check if user is an admin
      if (data.user && data.user.email && adminEmails.includes(data.user.email)) {
        toast({
          title: "Zalogowano pomyślnie",
          description: "Przekierowywanie do panelu administratora...",
        });
        
        navigate('/admin/dashboard');
      } else {
        // Not an admin, sign them out
        await supabase.auth.signOut();
        toast({
          title: "Brak uprawnień",
          description: "Tylko administratorzy mają dostęp do panelu.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Błąd logowania",
        description: error.message || "Nie udało się zalogować. Spróbuj ponownie.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <div className="text-center py-10">Przekierowywanie...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-medium">Panel Administratora</h1>
          <p className="mt-2 text-gray-600">Zaloguj się, aby zarządzać treścią strony</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
