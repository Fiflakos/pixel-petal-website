
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionType, supabase } from '../../lib/supabase';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { objectsToCSV, downloadCSV } from '@/utils/csvUtils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash, Plus, Download, Image } from 'lucide-react';

interface SessionListProps {
  sessions: SessionType[];
  loading: boolean;
  onRefresh?: () => Promise<void>;
}

const SessionList = ({ sessions, loading, onRefresh }: SessionListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const confirmDelete = (sessionId: string) => {
    setDeleteSessionId(sessionId);
  };

  const cancelDelete = () => {
    setDeleteSessionId(null);
  };

  const handleDelete = async () => {
    if (!deleteSessionId) return;
    
    setDeleteLoading(true);
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', deleteSessionId);
      
      if (error) throw error;
      
      toast({
        title: "Sesja usunięta",
        description: "Sesja została pomyślnie usunięta."
      });
      
      // Refresh the list
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error: any) {
      toast({
        title: "Błąd usuwania",
        description: error.message || "Nie udało się usunąć sesji.",
        variant: "destructive"
      });
    } finally {
      setDeleteLoading(false);
      setDeleteSessionId(null);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-medium">Lista sesji</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={exportSessions}
            disabled={sessions.length === 0 || loading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Eksportuj do CSV</span>
          </Button>
          <Button 
            onClick={() => navigate('/admin/new-session')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Dodaj sesję</span>
          </Button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Ładowanie sesji zdjęciowych...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">Brak sesji zdjęciowych</p>
            <Button onClick={() => navigate('/admin/new-session')} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              <span>Dodaj pierwszą sesję</span>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zdjęcie</TableHead>
                <TableHead>Tytuł</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Rok</TableHead>
                <TableHead>Liczba zdjęć</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    {session.image_urls && session.image_urls.length > 0 ? (
                      <img 
                        src={session.image_urls[0]} 
                        alt={session.title} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{session.title}</TableCell>
                  <TableCell>{session.category}</TableCell>
                  <TableCell>{session.year}</TableCell>
                  <TableCell>{session.image_urls?.length || 0}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/admin/edit-session/${session.id}`)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edytuj</span>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => confirmDelete(session.id)}
                        className="flex items-center gap-1"
                      >
                        <Trash className="h-3 w-3" />
                        <span>Usuń</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertDialog open={!!deleteSessionId} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdzenie usunięcia</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz usunąć tę sesję? Ta operacja jest nieodwracalna i wszystkie zdjęcia tej sesji zostaną usunięte.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Anuluj</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteLoading ? 'Usuwanie...' : 'Usuń sesję'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SessionList;
