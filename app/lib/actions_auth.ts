"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import sgMail from '@sendgrid/mail'
import { UserWithRole } from "@/global";
import { getSession, UpdateSession } from 'next-auth/react';
import { text } from 'stream/consumers';
import { getPasswordResetTokenByToken } from '@/lib/password-reset-token';
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

// export async function changePassword(userId:string, newPassword: string) {
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   const user = await prisma.user.update({
//     where: { id: userId },
//     data: { password: hashedPassword },
//   });
//   return user;
// }

export const newPassword = async (
  // values: z.infer<typeof NewPasswordSchema>,
  password:string,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  // const validatedFields = NewPasswordSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" };
  // }

  // const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};


export async function sendMail( {email, lang="en",
  subject="New message from Her(e) Otherwise",
  text="Thank you for joining her(e), otherwise.\n\nsaay|yaas",
  html="<p>Thank you for joining her(e), otherwise.</p><p>saay|yaas</p>"
} : { email: string, lang?: string, 
  subject?:string,
  text?:string 
  html?:string
}) {
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
    cci: "info@hereotherwise.site",
    from: "info@hereotherwise.site",
    subject: subject,
    text: text,
    html: html,
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