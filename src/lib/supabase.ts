
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Brakujące zmienne środowiskowe Supabase. Upewnij się, że ustawiłeś zmienne VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);

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
