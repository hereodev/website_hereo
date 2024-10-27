import FormReset from "@/app/_components/auth/form-reset";
import { NextPage } from "next";

// import { PasswordResetForm } from "@/_components/auth/PasswordResetForm";

type ResetPasswordPageProps = {};

const ResetPasswordPage: NextPage = async ({}: ResetPasswordPageProps) => {
  return (
    <>
      <FormReset />
    </>
  );
};

export default ResetPasswordPage;
