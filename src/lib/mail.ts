import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const link = `http://localhost:3000/verify-email?token=${token}`;

  return resend.emails.send({
    // unless we verified another domain, we must use @resend
    from: "testing@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
        <h1>Verify your email address</h1>
        <p>Click the link below to verify your email address</p>
        <a href="${link}">Verify email</a>
    `,
  });
}
