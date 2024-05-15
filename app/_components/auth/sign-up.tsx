
// import { signIn } from '@/auth';
// import FormSignIn from './form-signin';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import FormSignUp from './form-signup';

export function SignUp() {

    async function handleSignUp(formData: FormData) {
        'use server';
        // await signIn('credentials', formData);
        // sign up logic here add to prisma User
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
    }

    return (
        <FormSignUp handleSignUp={handleSignUp} />
    )

}