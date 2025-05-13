export async function validateRecaptcha(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return false;
  }
}
