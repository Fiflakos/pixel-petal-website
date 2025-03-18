
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabase';
import SessionFormFields from '@/components/admin/SessionFormFields';
import ImageUploader, { uploadImages } from '@/components/admin/ImageUploader';
import { useSessionOperations } from '@/hooks/useSessionOperations';

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
    
    try {
      // Upload new images if needed
      const newImageUrls = await uploadImages(images, toast);
      const allImageUrls = [...uploadedImages, ...newImageUrls];
      
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
      
      navigate('/admin/dashboard');
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
    return <div className="text-center py-10">Ładowanie danych sesji...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-serif font-medium mb-6">
            {isEditing ? 'Edytuj sesję' : 'Dodaj nową sesję'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <SessionFormFields 
              session={session} 
              handleChange={handleChange} 
            />
            
            <ImageUploader 
              initialImages={uploadedImages} 
              onImagesChange={updateImages} 
            />
            
            <div className="flex gap-4 justify-end">
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
              >
                {submitLoading ? 'Zapisywanie...' : isEditing ? 'Zapisz zmiany' : 'Dodaj sesję'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionForm;
