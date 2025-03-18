
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionType } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { objectsToCSV, downloadCSV } from '@/utils/csvUtils';

interface SessionListProps {
  sessions: SessionType[];
  loading: boolean;
  onRefresh?: () => Promise<void>;
}

const SessionList = ({ sessions, loading, onRefresh }: SessionListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const exportSessions = () => {
    if (sessions.length === 0) {
      toast({
        title: "Brak danych",
        description: "Nie ma sesji do wyeksportowania.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Przygotuj dane do eksportu (pomiń obrazy dla przejrzystości CSV)
      const exportData = sessions.map(session => ({
        id: session.id,
        title: session.title,
        description: session.description,
        category: session.category,
        year: session.year,
        created_at: session.created_at,
        image_count: session.image_urls?.length || 0
      }));

      const csvData = objectsToCSV(exportData);
      downloadCSV(csvData, `sessions_export_${new Date().toISOString().split('T')[0]}.csv`);

      toast({
        title: "Eksport zakończony",
        description: "Dane sesji zostały wyeksportowane pomyślnie."
      });
    } catch (error: any) {
      toast({
        title: "Błąd eksportu",
        description: error.message || "Nie udało się wyeksportować danych.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (sessionId: string) => {
    // This is a placeholder for future delete functionality
    // When implemented, it should call onRefresh after successful deletion
    console.log("Delete session with ID:", sessionId);
    
    // After deletion is implemented, we would call onRefresh to update the list
    if (onRefresh) {
      await onRefresh();
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-medium">Lista sesji</h2>
        <Button 
          variant="outline" 
          onClick={exportSessions}
          disabled={sessions.length === 0 || loading}
        >
          Eksportuj do CSV
        </Button>
      </div>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Rok</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{session.category}</TableCell>
                  <TableCell>{session.year}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/edit-session/${session.id}`)}>
                        Edytuj
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(session.id)}
                      >
                        Usuń
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default SessionList;
