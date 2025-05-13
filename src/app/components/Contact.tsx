"use client";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { default as ReCAPTCHAType } from "react-google-recaptcha";

type ReCAPTCHAComponent = React.ForwardRefExoticComponent<
  React.ComponentProps<typeof ReCAPTCHAType> &
    React.RefAttributes<ReCAPTCHAType>
>;

const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha").then((mod) => mod.default),
  { ssr: false }
) as ReCAPTCHAComponent;

export default function Contact() {
  const [isHydrated, setIsHydrated] = useState(false);
  const recaptchaRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      recaptchaToken: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      message: Yup.string()
        .min(30, "Minimum 30 characters")
        .required("Required"),
      recaptchaToken: Yup.string().required("Please complete the CAPTCHA"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Sending message...");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        toast.success("Message sent successfully!", { id: toastId });
        resetForm();
        recaptchaRef.current?.reset();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to send message",
          { id: toastId }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <section id="contact" className="relative py-28 px-4 max-w-3xl mx-auto">
      <motion.div
        className="mb-16"
        initial={isHydrated ? { opacity: 0, y: 20 } : undefined}
        whileInView={isHydrated ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-orbitron mb-6"
          initial={isHydrated ? { x: -20 } : undefined}
          whileInView={isHydrated ? { x: 0 } : undefined}
          viewport={{ once: true }}
        >
          <span className="font-mono text-accent mr-2">{"//"}</span>
          Let`s <span className="text-accent">Connect</span>
        </motion.h2>
        <motion.div
          className="h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 w-1/2"
          initial={isHydrated ? { scaleX: 0 } : undefined}
          whileInView={isHydrated ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </motion.div>

      <motion.div
        initial={isHydrated ? { opacity: 0 } : undefined}
        whileInView={isHydrated ? { opacity: 1 } : undefined}
        viewport={{ once: true }}
        className="bg-primary/20 border border-gray-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm"
      >
        <form onSubmit={formik.handleSubmit} className="font-mono space-y-6">
          {[
            {
              id: "name",
              label: "NAME",
              type: "text",
              placeholder: "Enter your name",
            },
            {
              id: "email",
              label: "EMAIL",
              type: "email",
              placeholder: "your@email.com",
            },
            {
              id: "message",
              label: "MESSAGE",
              type: "textarea",
              placeholder: "Your message (minimum 30 characters)",
            },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-accent mb-1">
                <span className="font-mono">$</span> {field.label}:
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  rows={5}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.id as keyof typeof formik.values]}
                  className="w-full bg-primary/10 border border-gray-700 focus:border-accent rounded-sm outline-none py-2 px-3 transition-colors extension-protected"
                  placeholder={field.placeholder}
                  suppressHydrationWarning
                />
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={
                    field.id === "name"
                      ? "name"
                      : field.id === "email"
                        ? "email"
                        : undefined
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.id as keyof typeof formik.values]}
                  className="w-full bg-primary/10 border-b border-gray-700 focus:border-accent outline-none py-2 px-1 transition-colors extension-protected"
                  placeholder={field.placeholder}
                  suppressHydrationWarning
                />
              )}
              {formik.touched[field.id as keyof typeof formik.touched] &&
              formik.errors[field.id as keyof typeof formik.errors] ? (
                <div className="text-red-400 text-xs mt-1 font-mono">
                  {formik.errors[field.id as keyof typeof formik.errors]}
                </div>
              ) : null}
            </div>
          ))}

          <div className="mt-4">
            {isHydrated && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) =>
                  formik.setFieldValue("recaptchaToken", token)
                }
                onErrored={() =>
                  formik.setFieldError(
                    "recaptchaToken",
                    "CAPTCHA verification failed"
                  )
                }
                className="flex justify-center"
              />
            )}
            {formik.touched.recaptchaToken && formik.errors.recaptchaToken ? (
              <div className="text-red-400 text-xs mt-1 font-mono">
                {formik.errors.recaptchaToken}
              </div>
            ) : null}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !isHydrated}
            whileHover={isHydrated ? { scale: 1.02 } : {}}
            whileTap={isHydrated ? { scale: 0.98 } : {}}
            className="flex items-center justify-center gap-2 bg-accent text-primary px-6 py-3 rounded-md font-medium disabled:opacity-50 w-full"
          >
            {isSubmitting ? (
              <motion.span
                animate={isHydrated ? { rotate: 360 } : {}}
                transition={
                  isHydrated
                    ? { repeat: Infinity, duration: 1, ease: "linear" }
                    : {}
                }
                className="inline-block"
              >
                <FiSend />
              </motion.span>
            ) : (
              <>
                <FiSend />
                <span className="font-mono">EXECUTE</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="flex justify-center gap-6 mt-12"
        initial={isHydrated ? { opacity: 0 } : undefined}
        whileInView={isHydrated ? { opacity: 1 } : undefined}
        viewport={{ once: true }}
      >
        {[
          {
            icon: <FiGithub size={24} />,
            href: "https://github.com/lagitit",
            label: "GitHub",
          },
          {
            icon: <FiLinkedin size={24} />,
            href: "https://www.linkedin.com/in/zendev/",
            label: "LinkedIn",
          },
        ].map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="text-gray-400 hover:text-accent transition-colors flex flex-col items-center group"
            aria-label={social.label}
          >
            {social.icon}
            <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
              {social.label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
