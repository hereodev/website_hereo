"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import sgMail from '@sendgrid/mail'
import { UserWithRole } from "@/global";
import { getSession, UpdateSession } from 'next-auth/react';
// import jwt from 'jsonwebtoken';
export async function myAction() {
  console.log("action: myAction...")
  return Promise.resolve("foo");
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  let user : UserWithRole | undefined;
  try {
    user = await signIn('credentials', formData);
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
  // redirect('/offerings'); // no need: redirect is set in the auth.ts file
  // if(user && user?.id) {
  //   redirect("/profile/" + user.id)
  // }
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
    // redirect("/offerings/" + user.id)
    redirect("/auth/signin?signedup=" + user.email)
  }

}

export async function sendMail( {email, lang="en"} : { email: string, lang?: string }) {
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
    cc: "hereotherwise@vuongvan.dev",
    from: "hereotherwise@vuongvan.dev",
    subject: `New message from Her(e) Otherwise`,
    text: "Thank you for signing up to Her(e) Otherwise.",
}

try {
  await sgMail.send(rawFormData)
  // Send a success response
  console.log("Email Sent Successfully!")
  // TODO: add to db: email sent
  return 'Email sent';
} catch (error) {
  // Send an error response
  console.log("Something went wrong, please try again!")
  // TODO: send error message to the admin
  return "Something went wrong, please try again!"
}

}

async function updateJwt(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const session = getSession();
  console.log("session", session);
}

export async function changeName(userId:string, newName: string) {
  console.log("action: changing name...")
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name: newName },
  });
  // updateJwt(userId);
  return user;
}

export async function changeEmail(userId:string, newEmail: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { email: newEmail },
  });
  sendMail({ email: newEmail });
  return user;
}