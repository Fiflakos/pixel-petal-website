
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, SessionType } from '../lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export const useSessionOperations = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
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
        // Ensure image_urls is always an array
        const sessionData = {
          ...data,
          image_urls: Array.isArray(data.image_urls) ? data.image_urls : []
        };
        
        setSession(sessionData);
        setUploadedImages(sessionData.image_urls || []);
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

  const updateImages = (newImages: string[]) => {
    setUploadedImages(newImages);
    // Also update the session object
    setSession(prev => ({ ...prev, image_urls: newImages }));
  };

  return {
    isEditing,
    loading,
    session,
    setSession,
    images,
    setImages,
    uploadedImages,
    setUploadedImages,
    handleChange,
    handleImageChange,
    updateImages,
    navigate,
    toast
  };
};
