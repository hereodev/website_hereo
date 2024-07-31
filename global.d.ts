import { User } from "next-auth";
import { Art, Media, SubCategory, User, Author, Authorship, MediaInArt } from "@prisma/client";

export type UserWithRole = User & {
    id: string;
    name: string | null; 
    email: string; 
    password: string | null;
    role: string;
}

type UploadedFile = {
    file: File;
    progress: number | undefined;
    uploaded: boolean;
    path?: string;
    type?: string;
    alt?: string;
    // description?: string;
    storage?: string;
    author?: string;
    date?: string;
    title?: string;
    url?: string;
};


interface MediaWithDetails extends Media {
    associated_media: MediaInArt[];
  }
  
  interface AuthorshipWithDetails extends Authorship {
    author: Author;
  }
  
export interface ArtWithDetails extends Art {
    associated_media: (MediaInArt & { Media: Media })[];
    SubCategory: SubCategory | null;
    uploader: Pick<User, 'name' | 'email' | 'role'>;
    authors: AuthorshipWithDetails[];
}
  
  // Define the main type for the query result
export type AllArt = ArtWithDetails[];

export type ExtendedArt = Art & {
    SubCategory: {
      name: string;
      Category: {
        id: number;
        name: string;
      } | null;
    } | null;
    authors: {
      author: {
        name: string;
        associated_user: {
          name: string;
        } | null;
      };
    }[];
    associated_media: {
      Media: any;
    }[];
    uploader: {
      name: string | null;
      email: string;
      role: UserRole;
    };
};
