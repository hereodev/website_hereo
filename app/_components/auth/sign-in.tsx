
import { signIn } from '@/auth';
import FormSignIn from './form-signin';

export function SignIn() {

    async function handleSignIn(formData: FormData) {
        'use server';
        await signIn('credentials', formData);
    }

    return (
        <FormSignIn handleSignIn={handleSignIn} />
    )

}