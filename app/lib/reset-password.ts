"use server";
import prisma from "@/prisma";
import { sendMail } from "./actions_auth";
import { generatePasswordResetToken } from "@/lib/tokens";

export const resetPassword = async ({ email }: { email: string }) => {
    console.log(`resetPassword called with email: ${email}`);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        console.error(`Email not found: ${email}`);
        return { error: "Email not found!" };
    }

    console.log(`User found: ${existingUser.id}`);

    const passwordResetToken = await generatePasswordResetToken(email);
    console.log(`Generated password reset token for email: ${email}`);

    const resetLink = `hereotherwise.site/auth/new-password?token=${passwordResetToken.token}`;
    console.log(`Generated reset link: ${resetLink}`);

    await sendMail({
        email,
        // add a text: that gives the link in plain text, in html, also add the link in plain text in small font
        text: `Click here to reset password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
        subject: "Reset your Password",
    });

    console.log(`Reset email sent to: ${email}`);

    return { success: "Reset email sent!" };
};
