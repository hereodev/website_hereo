"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    redirect('/indx');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function addUser(
  // state: { id: number; name: string | null; email: string; password: string | null; role: UserRole; } | undefined,
  prevState: string | undefined,
  formData: FormData,
) {
  let user;
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    const name = formData.get('name') as string;
    user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: 'USER'
        }
    });
    // return user;
  } catch (error) {
    // console.error('Something went wrong.');
    return('Something went wrong.')
    throw error;
  }
  if(user && user.id) {
    // redirect("/indx/" + user.id)
    redirect("/auth/signin?signedup=" + user.email)
  }

}

