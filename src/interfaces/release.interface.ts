export interface ReleaseResponse {
  releaseId: number;
  title: string;
  artist: string;
  artistId: string;
  artistImage: string;
  cover: string;
  preview: string | null;
  releaseSlug: string;
  message: string;
  userId: number;
}

export interface Release {
  id: number;
  title: string;
  artist: string;
  artistId: string;
  artistImage: string;
  cover: string;
  preview: string | null;
  creationDate: Date;
  lastUpdate: Date;
  userID: number;
  slug: string;
  platforms: Platform[];
}

export interface Platform {
  id: number;
  name: string;
  logoUrl: string;
  actionVerb: string;
  url: string | null;
  visibility: boolean;
}
