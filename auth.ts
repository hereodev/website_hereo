import NextAuth, { User, type Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { UserWithRole } from "./global";
import prisma from "@/prisma";
import { z } from "zod";
// import bcrypt from 'bcrypt';

interface AdapterUser {
  id: string;
  role?: string;
}
async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({where: {email: email}});
    console.log('GOT user', user)
    return user;
  } catch(e) {
    console.error("Failed to fetch user", e);
    throw new Error("Failed to fetch user")
  }
  // const prismaUser = await prisma.user.findUnique({where:{email: email}});
  // return prismaUser as UserWithRole | null;
  // return { id: 1, name: 'John Doe', email: 'a@b.fr', role: "ADMIN" };
}

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
  } = NextAuth({
    providers: [
        Google({
          profile(profile) {
            return { role: profile.role ?? "USER", ...profile}
          }
        }),
        Credentials({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              // username: { label: "Username", type: "text", placeholder: "jsmith" },
              email: { label: "E-mail", type: "text", placeholder: "example@email.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<User | UserWithRole | null> {
              // Add logic here to look up the user from the credentials supplied
              // const user = { id: "1", name: "J Smith", email: "a@b.com", role: "ADMIN" }
              // const user = await getUser();
              // console.log('credentials', credentials)
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
                console.log('parsedCredentials', parsedCredentials.data)
              if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                // const passwordsMatch = await bcrypt.compare(password, user.password || "");
                const passwordsMatch = user.password?.match('carton') || false;

                if (passwordsMatch) return user as UserWithRole;

              }
              // const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
              // {
              //   method: "POST",
              //   body: JSON.stringify(userCredentials),
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              // });

              // const user = await response.json();
              console.log('Invalid credentials');
              return null;

              // if (user) {
              //   // Any object returned will be saved in `user` property of the JWT
              //   return user
              // } else {
              //   // If you return null then an error will be displayed advising the user to check their details.
              //   return null
        
              //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              // }
            }
          })
    ],
    callbacks: {
      async jwt( { token, user }) {
        if(user) { 
          token.id = user.id;
          token.role = (user as { role?: string }).role || "USER";
        };
        return token;
      },
      async session({ session, token }: { session: Session; user?: AdapterUser; token?: JWT }) {
        if (session.user) {
          session.user.id = token?.id as string;
          (session.user as UserWithRole).role = token?.role as string; // Update the type of session.user to include the role property
        }
        return session;
      },
      async redirect({ url, baseUrl }) {
        //   // Allows relative callback URLs
        //   if (url.startsWith("/")) return `${baseUrl}${url}`
        //   // Allows callback URLs on the same origin
        //   else if (new URL(url).origin === baseUrl) return url
        //   return baseUrl
        return "/"
      }
    }
});