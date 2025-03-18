
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

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
    if (!images || images.length === 0) return [];
    
    setUploadLoading(true);
    
    try {
      const newImageUrls = await uploadImages(images, toast);
      const newImages = [...uploadedImages, ...newImageUrls];
      setUploadedImages(newImages);
      onImagesChange(newImages);
      
      return newImageUrls;
    } finally {
      setUploadLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    onImagesChange(newImages);
  };

  return (
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

      {images && images.length > 0 && (
        <button
          type="button"
          onClick={handleUploadImages}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={uploadLoading}
        >
          {uploadLoading ? "Uploading..." : "Upload Selected Images"}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
