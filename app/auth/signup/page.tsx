// import FormSignUp from "@/app/_components/auth/form-signup";
import { SignUp } from "@/app/_components/auth/sign-up";
import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";


const SignUpPage = () => {
    return (
        <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col grow items-center justify-center">
            <h1>Sign Up</h1>
            {/* <SignUpForm /> */}
            <SignUp />
            <div className="w-full flex flex-col items-center gap-2">
                {/* <div className="divider lg:divider-horizontal">Or continue with</div>
                <div className="flex flex-col justify-center items-center">
                    <a href="#" className="text-info"><AiFillGoogleCircle className="h-16 w-16"/></a>
                </div> */}
                <div className="justify-center items-center mt-8">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-primary hover:underline">Login here.</Link>
                </div>
            </div>

        </div>
    );
}

export default SignUpPage;