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
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject,
      text,
      html,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
