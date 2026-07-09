import {resend} from '@/lib/resend';
import verificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6-digit OTP
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // set expiry time to 10 minutes from now
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify your email',
      react: verificationEmail({ username, otp:verifyCode }),
    });
    return {
      success: true,
      message: 'Verification email sent successfully',
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      message: 'Failed to send verification email',
    };
  }
}