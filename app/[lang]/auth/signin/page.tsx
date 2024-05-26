import React from 'react';
// import { SignIn } from '@/app/_components/auth/sign-in';
import FormSignIn from '@/app/_components/auth/form-signin';
import Link from 'next/link';
import { Suspense } from 'react'

const SignInPage: React.FC = () => {
    return (
        <div>
            <h1>Sign In</h1>
            {/* <SignIn /> */}
            <Suspense>
                <FormSignIn />
            </Suspense>
            <div className="w-full flex flex-col items-center gap-2">
                {/* <div className="divider lg:divider-horizontal">Or continue with</div>
                <div className="flex flex-col justify-center items-center">
                    <a href="#" className="text-info"><AiFillGoogleCircle className="h-16 w-16"/></a>
                </div> */}
                <div className="justify-center items-center mt-8">
                    No account yet?{' '}
                    <Link href="/auth/signup" className="text-accent">Sign up here.</Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;