import { User } from "next-auth";

export type UserWithRole = User & {
    id: number
    name: string | null; email: string; password: string | null;
    role: string
}

