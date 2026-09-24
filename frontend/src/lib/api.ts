import type { Art } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function mapArt(raw: any): Art {
  return {
    id: raw.id,
    artistId: raw.artist_id,
    title: raw.title,
    imageUrl: raw.image_url,
    description: raw.description ?? undefined,
  };
}

export async function fetchInitialArt(): Promise<Art> {
  const res = await fetch(`${API_BASE_URL}/art/`);
  if (!res.ok) throw new Error(`Failed to fetch initial art: ${res.status}`);
  return mapArt(await res.json());
}

export async function fetchNextArt(excludeId: string): Promise<Art> {
  const res = await fetch(`${API_BASE_URL}/art/next?exclude_id=${excludeId}`);
  if (!res.ok) throw new Error(`Failed to fetch next art: ${res.status}`);
  return mapArt(await res.json());
}