"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
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
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    const name = formData.get('name') as string;
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: 'USER'
        }
    });
    return user;
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

