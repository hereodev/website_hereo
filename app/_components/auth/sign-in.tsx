
import { signIn } from '@/auth';
import FormSignIn from './form-signin';
import { AuthError } from 'next-auth';
import { SignUp } from './sign-up';
import Link from 'next/link';

export function SignIn() {

    async function handleSignIn(formData: FormData) {
        console.log("SIGNING IN")
        'use server';
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

    return (
        <>
            <FormSignIn />
            <div>
                No account yet?
                <Link href="auth/signup">Sign up here.</Link>
            </div>
        </>
    )

}