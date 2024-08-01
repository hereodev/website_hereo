import { User } from "next-auth";
import { Art, Media, SubCategory, ArtSubCategory, User as PrismaUser, Author, Authorship, MediaInArt } from "@prisma/client";

export type UserWithRole = PrismaUser & {
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

interface ArtWithSubCategories extends Art {
  subCategories: SubCategory[];
}

export interface ArtWithDetails extends ArtWithSubCategories {
  associated_media: (MediaInArt & { Media: Media })[];
  uploader: Pick<PrismaUser, 'name' | 'email' | 'role'>;
  authors: AuthorshipWithDetails[];
}

// Define the main type for the query result
export type AllArt = ArtWithDetails[];

export type ExtendedArt = Art & {
  associated_media: {
      Media: any;
  }[];
  SubCategories: {
      SubCategory: {
          name: string;
          Category: {
              id: number;
              name: string;
          } | null;
      };
  }[];
  uploader: {
      name: string | null;
      email: string;
      role: UserRole;
  };
  authors: {
      author: {
          name: string;
          associated_user: {
              name: string;
          } | null;
      };
  }[];
};