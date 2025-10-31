"use client";

import { motion } from "framer-motion";
import { Experience, Education } from "@/types/database.types";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { cleanAIText, truncateToSentence } from "@/lib/utils/textCleaner";

interface ExperienceSectionProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceSection({ experience, education }: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (experience.length === 0 && education.length === 0) return null;

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
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
                Journey
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Experience & Education
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience Timeline */}
            {experience.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
                </div>

                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * index }}
                      className="relative pl-8 pb-8 border-l-2 border-purple-200 last:border-l-0 last:pb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 ring-4 ring-purple-50"></div>

                      {/* Content Card */}
                      <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg shadow-purple-200/50 border border-white/50 hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{exp.role}</h4>
                            <p className="text-purple-600 font-semibold">{exp.company_name}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(exp.start_date).getFullYear()}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {truncateToSentence(cleanAIText(exp.refined_description || exp.description || ""), 150) || "Professional experience in this role."}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Timeline */}
            {education.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                </div>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * index }}
                      className="relative pl-8 pb-8 border-l-2 border-pink-200 last:border-l-0 last:pb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 ring-4 ring-pink-50"></div>

                      {/* Content Card */}
                      <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg shadow-pink-200/50 border border-white/50 hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                            <p className="text-fuchsia-600 font-semibold">{edu.field_of_study}</p>
                            <p className="text-gray-600 text-sm">{edu.institution_name}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 bg-pink-100 px-3 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            <span>{edu.start_year}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
