"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const contacts = [
  {
    label: "Email",
    value: "kkdjanakaeranda@gmail.com",
    href: "mailto:kkdjanakaeranda@gmail.com",
    icon: "✉️",
  },
  {
    label: "Phone",
    value: "+94 71 136 7585",
    href: "tel:+94711367585",
    icon: "📞",
  },
  {
    label: "GitHub",
    value: "github.com/kkdjanakaeranda",
    href: "https://github.com/kkdjanakaeranda",
    icon: "💻",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kkdjanakaeranda",
    href: "https://linkedin.com/in/kkdjanakaeranda",
    icon: "🔗",
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setLoading(true);
  setSuccess("");
  setError("");

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to send");
    }

    setError("");
    setSuccess("Message sent successfully!");
    form.reset();
  } catch (err) {
    setSuccess("");
    setError("Failed to send message.");
  } finally {
    setLoading(false);
  }
}
  return (
    
    <section
      id="contact"
      className="relative bg-black text-white py-20 px-3 overflow-hidden scroll-mt-8"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.16),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-[0.3em] text-sm mb-4">
            CONTACT
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            Let's Build Something Amazing
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl leading-7">
            Have an internship opportunity, project idea, or collaboration in
            mind? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {contacts.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={
                  item.label === "Email" || item.label === "Phone"
                    ? undefined
                    : "_blank"
                }
                rel={
                  item.label === "Email" || item.label === "Phone"
                    ? undefined
                    : "noreferrer"
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-violet-500/60 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10 w-12 h-12 shrink-0 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <div className="relative z-10 min-w-0">
                  <p className="text-zinc-500 text-sm">
                    {item.label}
                  </p>

                  <p className="text-white mt-1 text-sm break-words group-hover:text-violet-300 transition">
                    {item.value}
                  </p>
                </div>

                <span className="relative z-10 ml-auto text-zinc-600 group-hover:text-violet-400 transition">
                  →
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-sm outline-none focus:border-violet-500 transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-sm outline-none focus:border-violet-500 transition"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-sm outline-none focus:border-violet-500 transition"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-sm outline-none focus:border-violet-500 transition resize-none"
                />

                {success && (
                    <p className="text-green-400 text-sm">
                      {success}
                    </p>
                  )}

                  {error && (
                    <p className="text-red-400 text-sm">
                      {error}
                    </p>
                  )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-4 rounded-2xl font-medium hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    
  );
}