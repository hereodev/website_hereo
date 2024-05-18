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
};
