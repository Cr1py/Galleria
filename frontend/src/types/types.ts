export type Artist = {
  id: string; 
  email: string;
  password: string;
  name: string;
  art: string; 
  handle: string;  
}

export type Art = {
  id: string;
  artistId: string; // foreign key back to Artist's id
  title: string;
  imageUrl: string;
  description?: string;
}
