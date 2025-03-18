
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SessionType } from '@/lib/supabase';

interface SessionFormFieldsProps {
  session: Partial<SessionType>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SessionFormFields: React.FC<SessionFormFieldsProps> = ({ session, handleChange }) => {
  return (
    <>
      <div>
        <Label htmlFor="title">Tytuł sesji</Label>
        <Input
          id="title"
          name="title"
          value={session.title || ''}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Kategoria</Label>
        <Input
          id="category"
          name="category"
          value={session.category || ''}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="year">Rok</Label>
        <Input
          id="year"
          name="year"
          value={session.year || ''}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Opis</Label>
        <Textarea
          id="description"
          name="description"
          value={session.description || ''}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </>
  );
};

export default SessionFormFields;
