"use client";

import { motion } from "framer-motion";
import { User } from "@/types/database.types";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Send, Heart } from "lucide-react";

interface ContactSectionProps {
  user: User;
}

export default function ContactSection({ user }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Title */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg inline-block">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
          >
            Have a project in mind? Let's create something amazing together. 
            I'm always open to discussing new opportunities and collaborations.
          </motion.p>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Email Display */}
              <div className="flex items-center gap-3 text-white">
                <Mail className="h-6 w-6" />
                <span className="text-xl font-semibold">{user.email}</span>
              </div>

              {/* CTA Button */}
              <a
                href={`mailto:${user.email}`}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Send Me a Message
              </a>


            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-16 text-white/80"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-current text-pink-300" />
              <span>using Gemini + Supabase + Vercel</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} {user.name}. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
