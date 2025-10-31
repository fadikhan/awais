import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { PortfolioData } from "@/types/database.types";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default async function PortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();
  const userId = params.username;

  // Fetch all user data
  const [userResult, projectsResult, skillsResult, experienceResult, educationResult] = await Promise.all([
    supabase.from("users").select("*").eq("id", userId).single(),
    supabase.from("projects").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("skills").select("*").eq("user_id", userId),
    supabase.from("experience").select("*").eq("user_id", userId).order("start_date", { ascending: false }),
    supabase.from("education").select("*").eq("user_id", userId).order("start_year", { ascending: false }),
  ]);

  if (!userResult.data) {
    notFound();
  }

  const portfolioData: PortfolioData = {
    user: userResult.data,
    projects: projectsResult.data || [],
    skills: skillsResult.data || [],
    experience: experienceResult.data || [],
    education: educationResult.data || [],
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection user={portfolioData.user} userId={userId} />
      <AboutSection user={portfolioData.user} />
      <SkillsSection skills={portfolioData.skills} />
      <ProjectsSection projects={portfolioData.projects} />
      <ExperienceSection 
        experience={portfolioData.experience} 
        education={portfolioData.education} 
      />
      <ContactSection user={portfolioData.user} />
    </div>
  );
}
