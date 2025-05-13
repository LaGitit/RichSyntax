import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailOptions = {
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ subject, text, html }: EmailOptions) {
  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "richardlawal2001@gmail.com",
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
