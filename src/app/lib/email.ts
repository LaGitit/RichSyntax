import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailOptions = {
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ subject, text, html }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact https://richsyntax.vercel.app/",
      to: process.env.CONTACT_EMAIL || "richardlawal2001@gmail.com",
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
