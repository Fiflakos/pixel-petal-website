
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabase';
import SessionFormFields from '@/components/admin/SessionFormFields';
import ImageUploader, { uploadImages } from '@/components/admin/ImageUploader';
import { useSessionOperations } from '@/hooks/useSessionOperations';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";

const SessionForm = () => {
  const {
    isEditing,
    loading,
    session,
    uploadedImages,
    handleChange,
    navigate,
    toast,
    updateImages
  } = useSessionOperations();
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    if (!session.title || !session.category || !session.year) {
      toast({
        title: "Brakujące dane",
        description: "Wypełnij wszystkie wymagane pola formularza.",
        variant: "destructive"
      });
      setSubmitLoading(false);
      return;
    }
    
    try {
      // Make sure we have the image URLs
      const allImageUrls = [...uploadedImages];
      
      if (isEditing) {
        // Update existing session
        const { error } = await supabase
          .from('sessions')
          .update({
            title: session.title,
            description: session.description,
            category: session.category,
            year: session.year,
            image_urls: allImageUrls
          })
          .eq('id', session.id);
        
        if (error) throw error;
        
        toast({
          title: "Sukces",
          description: "Sesja została zaktualizowana."
        });
      } else {
        // Add new session
        const { error } = await supabase
          .from('sessions')
          .insert({
            title: session.title || '',
            description: session.description || '',
            category: session.category || '',
            year: session.year || new Date().getFullYear().toString(),
            image_urls: allImageUrls
          });
        
        if (error) throw error;
        
        toast({
          title: "Sukces",
          description: "Nowa sesja została dodana."
        });
      }
      
      // Navigate back to dashboard after short delay to show toast
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się zapisać sesji.",
        variant: "destructive"
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Powrót do listy</span>
          </Button>
          <h1 className="text-2xl font-serif font-medium ml-4">
            {isEditing ? 'Edytuj sesję' : 'Dodaj nową sesję'}
          </h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edycja sesji zdjęciowej' : 'Nowa sesja zdjęciowa'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <SessionFormFields 
                session={session} 
                handleChange={handleChange} 
              />
              
              <ImageUploader 
                initialImages={uploadedImages} 
                onImagesChange={updateImages} 
              />
              
              <div className="flex gap-4 justify-end pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Anuluj
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || submitLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {submitLoading ? 'Zapisywanie...' : isEditing ? 'Zapisz zmiany' : 'Dodaj sesję'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionForm;
