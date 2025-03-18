
import React from 'react';
import { ContactMessage } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { objectsToCSV, downloadCSV } from '@/utils/csvUtils';

interface MessageListProps {
  messages: ContactMessage[];
  loading: boolean;
  onMarkAsRead: (id: string) => Promise<void>;
}

const MessageList = ({ messages, loading, onMarkAsRead }: MessageListProps) => {
  const { toast } = useToast();

  const exportMessages = () => {
    if (messages.length === 0) {
      toast({
        title: "Brak danych",
        description: "Nie ma wiadomości do wyeksportowania.",
        variant: "destructive"
      });
      return;
    }

    try {
      const csvData = objectsToCSV(messages);
      downloadCSV(csvData, `messages_export_${new Date().toISOString().split('T')[0]}.csv`);

      toast({
        title: "Eksport zakończony",
        description: "Wiadomości zostały wyeksportowane pomyślnie."
      });
    } catch (error: any) {
      toast({
        title: "Błąd eksportu",
        description: error.message || "Nie udało się wyeksportować danych.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-medium">Wiadomości kontaktowe</h2>
        <Button 
          variant="outline" 
          onClick={exportMessages}
          disabled={messages.length === 0 || loading}
        >
          Eksportuj do CSV
        </Button>
      </div>
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
                      onClick={() => onMarkAsRead(message.id)}
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
    </>
  );
};

export default MessageList;
