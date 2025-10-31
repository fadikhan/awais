"use client";

import { motion } from "framer-motion";
import { Skill } from "@/types/database.types";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Zap, Star } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

const skillIcons: Record<string, any> = {
  default: Code,
  design: Palette,
  development: Code,
  creative: Zap,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (skills.length === 0) return null;

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full text-sm font-semibold shadow-lg">
                Skills & Expertise
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              What I Do Best
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skillIcons.default;
              
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative"
                >
                  <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg shadow-purple-200/50 border border-white/50 hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {skill.skill_name}
                    </h3>

                    {/* Proficiency */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (skill.proficiency === "Expert" ? 5 : skill.proficiency === "Advanced" ? 4 : 3)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        {skill.proficiency}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { 
                          width: skill.proficiency === "Expert" ? "100%" : 
                                skill.proficiency === "Advanced" ? "80%" : "60%" 
                        } : {}}
                        transition={{ delay: 0.2 * index, duration: 1 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
