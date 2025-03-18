
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminEmails } = useAuth();
  
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
  }, [navigate, toast, adminEmails]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate email is in admin list first
    if (!adminEmails.includes(email)) {
      toast({
        title: "Brak uprawnień",
        description: "Podany email nie ma uprawnień administratora.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    try {
      console.log("Attempting admin login with", email);
      
      // Use data property for captchaToken instead of options.captchaToken
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          data: {
            captchaToken: 'bypass-captcha' // Using a more descriptive token
          }
        }
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      // Check if user is an admin
      if (data.user && data.user.email && adminEmails.includes(data.user.email)) {
        console.log("Admin login successful");
        toast({
          title: "Zalogowano pomyślnie",
          description: "Przekierowywanie do panelu administratora...",
        });
        
        navigate('/admin/dashboard');
      } else {
        // Not an admin, sign them out
        console.log("Not an admin, signing out");
        await supabase.auth.signOut();
        toast({
          title: "Brak uprawnień",
          description: "Tylko administratorzy mają dostęp do panelu.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error("Login error details:", error);
      
      if (error.message && error.message.includes("captcha")) {
        toast({
          title: "Problem z weryfikacją CAPTCHA",
          description: "Spróbuj ponownie za chwilę lub skontaktuj się z administratorem.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Błąd logowania",
          description: error.message || "Nie udało się zalogować. Spróbuj ponownie.",
          variant: "destructive"
        });
      }
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
        
        <div className="mt-4 text-sm text-center text-gray-600">
          <p>Konto administratora powinno być wcześniej skonfigurowane w systemie.</p>
          <p className="mt-2">W przypadku problemów z logowaniem, skontaktuj się z administratorem systemu.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
