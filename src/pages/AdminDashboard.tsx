
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, SessionType, ContactMessage } from '../lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SessionList from '@/components/admin/SessionList';
import MessageList from '@/components/admin/MessageList';
import CSVTemplateDownloader from '@/components/admin/CSVTemplateDownloader';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, adminEmails } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Brak autoryzacji",
          description: "Musisz się zalogować, aby uzyskać dostęp do panelu administracyjnego.",
          variant: "destructive"
        });
        navigate('/admin');
        return;
      }

      // Check if user email is in admin list
      const userEmail = data.session.user.email;
      if (!userEmail || !adminEmails.includes(userEmail)) {
        // Not an admin, sign them out
        await supabase.auth.signOut();
        toast({
          title: "Brak uprawnień",
          description: "Tylko administratorzy mają dostęp do panelu.",
          variant: "destructive"
        });
        navigate('/admin');
        return;
      }
      
      fetchData();
    };
    
    checkAuth();
  }, [navigate, toast, adminEmails]);

  // Make sure this component is only rendered for admins
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Pobierz sesje zdjęciowe
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (sessionsError) throw sessionsError;
      setSessions(sessionsData || []);
      
      // Pobierz wiadomości kontaktowe
      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (messagesError) throw messagesError;
      setMessages(messagesData || []);
    } catch (error: any) {
      toast({
        title: "Błąd pobierania danych",
        description: error.message || "Nie udało się pobrać danych.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
      
      toast({
        title: "Status zmieniony",
        description: "Wiadomość oznaczona jako przeczytana."
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się zmienić statusu wiadomości.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-medium text-gray-900">Panel Administratora</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/admin/new-session')}>
              Dodaj nową sesję
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Wyloguj się
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CSVTemplateDownloader />
        
        <Tabs defaultValue="sessions">
          <TabsList className="mb-8">
            <TabsTrigger value="sessions">Sesje zdjęciowe</TabsTrigger>
            <TabsTrigger value="messages">Wiadomości kontaktowe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions">
            <SessionList 
              sessions={sessions} 
              loading={loading} 
              onRefresh={fetchData}
            />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessageList 
              messages={messages} 
              loading={loading} 
              onMarkAsRead={markAsRead} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
