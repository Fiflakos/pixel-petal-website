
import { createClient } from '@supabase/supabase-js';

// Pobierz zmienne środowiskowe
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sprawdź, czy zmienne środowiskowe są dostępne
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Brakujące zmienne środowiskowe Supabase. Używam wartości placeholder do debugowania.');
}

// Utwórz klienta Supabase (używając wartości domyślnych jeśli brak zmiennych środowiskowych)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Eksportuj typy danych
export type SessionType = {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image_urls: string[];
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};
