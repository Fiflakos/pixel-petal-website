
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Image, X, UploadCloud } from 'lucide-react';

interface ImageUploaderProps {
  initialImages: string[];
  onImagesChange: (images: string[]) => void;
}

// Utility function for uploading images - exported at component level
export async function uploadImages(images: FileList | null, toast: any): Promise<string[]> {
  if (!images || images.length === 0) return [];
  
  const uploadedUrls: string[] = [];
  
  try {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `sessions/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      uploadedUrls.push(urlData.publicUrl);
    }
    
    return uploadedUrls;
  } catch (error: any) {
    toast({
      title: "Błąd przesyłania obrazów",
      description: error.message || "Nie udało się przesłać obrazów.",
      variant: "destructive"
    });
    return [];
  }
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImages, onImagesChange }) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>(initialImages);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const handleUploadImages = async () => {
    if (!images || images.length === 0) return;
    
    setUploadLoading(true);
    
    try {
      const newImageUrls = await uploadImages(images, toast);
      
      if (newImageUrls.length > 0) {
        const newImages = [...uploadedImages, ...newImageUrls];
        setUploadedImages(newImages);
        onImagesChange(newImages);
        
        // Clear the file input after successful upload
        setImages(null);
        const fileInput = document.getElementById('images') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        toast({
          title: "Zdjęcia dodane",
          description: `Pomyślnie dodano ${newImageUrls.length} zdjęć.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Błąd przesyłania obrazów",
        description: error.message || "Nie udało się przesłać obrazów.",
        variant: "destructive"
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    onImagesChange(newImages);
    
    toast({
      title: "Zdjęcie usunięte",
      description: "Usunięto zdjęcie z listy.",
    });
  };

  const setAsMainImage = (index: number) => {
    // Move the selected image to the first position
    if (index === 0) return; // Already the main image
    
    const newImages = [...uploadedImages];
    const mainImage = newImages[index];
    newImages.splice(index, 1);
    newImages.unshift(mainImage);
    
    setUploadedImages(newImages);
    onImagesChange(newImages);
    
    toast({
      title: "Zdjęcie główne",
      description: "Zmieniono zdjęcie główne sesji.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="images">Zdjęcia sesji</Label>
        <div className="flex items-center gap-2">
          <Input
            id="images"
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="flex-1"
          />
          
          {images && images.length > 0 && (
            <Button
              type="button"
              onClick={handleUploadImages}
              className="flex items-center gap-2"
              disabled={uploadLoading}
            >
              <UploadCloud className="w-4 h-4" />
              {uploadLoading ? "Przesyłanie..." : "Prześlij"}
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Pierwsze zdjęcie na liście będzie zdjęciem głównym pokazywanym w galerii.
        </p>
      </div>
      
      {uploadedImages.length > 0 && (
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Zdjęcia w sesji ({uploadedImages.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative group border rounded-md overflow-hidden">
                <img
                  src={url}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index !== 0 && (
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => setAsMainImage(index)}
                      className="flex items-center gap-1"
                    >
                      <Image className="w-3 h-3" />
                      <span className="text-xs">Główne</span>
                    </Button>
                  )}
                  
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => removeImage(index)}
                    className="flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span className="text-xs">Usuń</span>
                  </Button>
                </div>
                
                {index === 0 && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs">
                    Główne
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
