import { User } from "next-auth";

export type UserWithRole = User & {
    id: string
    // name: string
    // email: string
    role: string
}

