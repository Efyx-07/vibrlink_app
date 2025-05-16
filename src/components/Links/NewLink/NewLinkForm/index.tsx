'use client';

import FormField from '@/components/Shared/Forms/FormField';
import Button from '@/components/Shared/Button';
import { useState } from 'react';

export default function NewLinkForm() {
  const [albumUrl, setAlbumUrl] = useState<string>('');

  return (
    <form className="flex w-full flex-col gap-8">
      <FormField
        id="albumUrl"
        label="Enter your release Spotify link:"
        addedMention='example: "https://open.spotify.com/intl-fr/album/..."'
        name="albumUrl"
        type="text"
        value={albumUrl}
        onChange={(e) => setAlbumUrl(e.target.value)}
      />
      <Button type="submit" label="Create my link" />
    </form>
  );
}
