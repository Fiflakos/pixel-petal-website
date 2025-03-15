
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createSessionsCSVTemplate, createContactMessagesCSVTemplate } from '@/utils/csvTemplates';
import { downloadCSV } from '@/utils/csvUtils';

const CSVTemplateDownloader = () => {
  const { toast } = useToast();

  const downloadSessionsTemplate = () => {
    try {
      const csvData = createSessionsCSVTemplate();
      downloadCSV(csvData, 'sessions_template.csv');
      
      toast({
        title: "Szablon pobrany",
        description: "Szablon CSV dla sesji został pobrany pomyślnie."
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się pobrać szablonu.",
        variant: "destructive"
      });
    }
  };

  const downloadMessagesTemplate = () => {
    try {
      const csvData = createContactMessagesCSVTemplate();
      downloadCSV(csvData, 'contact_messages_template.csv');
      
      toast({
        title: "Szablon pobrany",
        description: "Szablon CSV dla wiadomości został pobrany pomyślnie."
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się pobrać szablonu.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <h2 className="text-xl font-medium mb-4">Szablony CSV do importu</h2>
      <p className="mb-4">
        Pobierz szablony CSV dla tabel Supabase, które możesz wypełnić danymi i zaimportować.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={downloadSessionsTemplate}>
          Pobierz szablon CSV dla sesji
        </Button>
        <Button variant="outline" onClick={downloadMessagesTemplate}>
          Pobierz szablon CSV dla wiadomości
        </Button>
      </div>
    </div>
  );
};

export default CSVTemplateDownloader;
