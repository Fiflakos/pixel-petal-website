
import { createClient } from '@supabase/supabase-js';

// Use the provided credentials
const supabaseUrl = 'https://ihpbzqmzoarbmagenoms.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocGJ6cW16b2FyYm1hZ2Vub21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjc4MTAsImV4cCI6MjA1Njk0MzgxMH0.hnvnIcfjnpdtg0jvak-F3-XpyFxUUOKtcxC_y4aEthU';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types for database tables
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
