
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, SessionType, ContactMessage } from '../lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin');
        return;
      }
      
      fetchData();
    };
    
    checkAuth();
  }, [navigate]);

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
        <Tabs defaultValue="sessions">
          <TabsList className="mb-8">
            <TabsTrigger value="sessions">Sesje zdjęciowe</TabsTrigger>
            <TabsTrigger value="messages">Wiadomości kontaktowe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {loading ? (
                <div className="p-6 text-center">Ładowanie sesji zdjęciowych...</div>
              ) : sessions.length === 0 ? (
                <div className="p-6 text-center">
                  <p>Brak sesji zdjęciowych</p>
                  <Button className="mt-4" onClick={() => navigate('/admin/new-session')}>
                    Dodaj pierwszą sesję
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {sessions.map((session) => (
                    <li key={session.id}>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{session.title}</h3>
                          <p className="text-sm text-gray-500">{session.category} | {session.year}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/admin/edit-session/${session.id}`)}>
                            Edytuj
                          </Button>
                          <Button variant="destructive" size="sm">
                            Usuń
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {loading ? (
                <div className="p-6 text-center">Ładowanie wiadomości...</div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center">Brak wiadomości kontaktowych</div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <li key={message.id} className={message.read ? "bg-white" : "bg-blue-50"}>
                      <div className="px-6 py-4">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium">{message.name}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.email}</p>
                        <p className="mt-2">{message.message}</p>
                        {!message.read && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2" 
                            onClick={() => markAsRead(message.id)}
                          >
                            Oznacz jako przeczytane
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
