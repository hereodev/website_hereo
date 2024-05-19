import { User } from "next-auth";

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
