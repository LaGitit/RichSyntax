import { NextResponse } from "next/server";
import { validateRecaptcha } from "@/app/lib/recaptcha";
import { sendEmail } from "@/app/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    const recaptchaValid = await validateRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { error: "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendEmail({
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
