
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Brakujące zmienne środowiskowe Supabase. Sprawdź ustawienia projektu Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
