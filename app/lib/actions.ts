"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import sgMail from '@sendgrid/mail'

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
  // redirect('/indx'); // no need: redirect is set in the auth.ts file
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
    sendMail({ email: user.email });
    // redirect("/indx/" + user.id)
    redirect("/auth/signin?signedup=" + user.email)
  }

}

export async function sendMail( email : { email: string }) {
  // send email
  const apiKey = process.env.SENDGRID_API_KEY;
  if(!apiKey) {
    throw new Error('SENDGRID_API_KEY not set');
  }
  // Set the SendGrid API key
  sgMail.setApiKey(apiKey);
  const rawFormData = {
    to: email || "isadoravuongvan@gmail.com",
    // to: email,
    from: "hereotherwise@vuongvan.dev",
    subject: `New message from ${"hereO!!"}`,
    text: "Hello, here is a message from her(e) otherwise!!",
}

try {
  await sgMail.send(rawFormData)
  // Send a success response
  console.log("Email Send Successfully!")
  return 'Email sent';
} catch (error) {
  // Send an error response
  console.log("Something went wrong, please try again!")
  return "Something went wrong, please try again!"
}

}