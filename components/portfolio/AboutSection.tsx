"use client";

import { motion } from "framer-motion";
import { User } from "@/types/database.types";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cleanAIText } from "@/lib/utils/textCleaner";

interface AboutSectionProps {
  user: User;
}

export default function AboutSection({ user }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full text-sm font-semibold shadow-lg">
                About Me
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Get to Know Me
            </h2>
          </div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-200/50 border border-white/50"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {cleanAIText(user.refined_bio || user.bio || "") || "Passionate professional dedicated to creating exceptional work."}
              </p>
            </div>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            </div>


          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
