import React from 'react';
// import { SignIn } from '@/app/_components/auth/sign-in';
import FormSignIn from '@/app/_components/auth/form-signin';
import Link from 'next/link';

const SignInPage: React.FC = () => {
    return (
        <div>
            <h1>Sign In</h1>
            {/* <SignIn /> */}
            <FormSignIn />
            <div>
                No account yet?
                <Link href="/auth/signup">Sign up here.</Link>
            </div>

        </div>
    );
};

export default SignInPage;