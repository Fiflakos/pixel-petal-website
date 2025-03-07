
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, SessionType } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const SessionForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [session, setSession] = useState<Partial<SessionType>>({
    title: '',
    description: '',
    category: '',
    year: new Date().getFullYear().toString(),
    image_urls: []
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin');
        return;
      }
      
      if (isEditing) {
        fetchSession();
      }
    };
    
    checkAuth();
  }, [id, navigate, isEditing]);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setSession(data);
        setUploadedImages(data.image_urls || []);
      }
    } catch (error: any) {
      toast({
        title: "Błąd pobierania danych",
        description: error.message || "Nie udało się pobrać danych sesji.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSession(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const uploadImages = async () => {
    if (!images || images.length === 0) return [];
    
    setUploadLoading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = `sessions/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('images')
          .upload(filePath, file, { upsert: true });
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
        
        uploadedUrls.push(urlData.publicUrl);
      }
      
      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      
      return uploadedUrls;
    } catch (error: any) {
      toast({
        title: "Błąd przesyłania obrazów",
        description: error.message || "Nie udało się przesłać obrazów.",
        variant: "destructive"
      });
      return [];
    } finally {
      setUploadLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prześlij nowe obrazy
      const newImageUrls = await uploadImages();
      const allImageUrls = [...uploadedImages, ...newImageUrls];
      
      if (isEditing) {
        // Aktualizacja istniejącej sesji
        const { error } = await supabase
          .from('sessions')
          .update({
            ...session,
            image_urls: allImageUrls
          })
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Sukces",
          description: "Sesja została zaktualizowana."
        });
      } else {
        // Dodawanie nowej sesji
        const { error } = await supabase
          .from('sessions')
          .insert({
            ...session,
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
      setLoading(false);
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
            <div>
              <Label htmlFor="title">Tytuł sesji</Label>
              <Input
                id="title"
                name="title"
                value={session.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Kategoria</Label>
              <Input
                id="category"
                name="category"
                value={session.category}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="year">Rok</Label>
              <Input
                id="year"
                name="year"
                value={session.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                name="description"
                value={session.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="images">Zdjęcia</Label>
              <Input
                id="images"
                type="file"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="mt-1"
              />
              
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
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
                disabled={loading || uploadLoading}
              >
                {loading || uploadLoading ? 'Zapisywanie...' : isEditing ? 'Zapisz zmiany' : 'Dodaj sesję'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionForm;
