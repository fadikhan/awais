import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { generateCV } from "@/lib/gemini/client";
import { cleanHTMLFromMarkdown } from "@/lib/utils/textCleaner";
import CVViewer from "@/components/cv/CVViewer";

export default async function CVPage({
  params,
}: {
  params: { userId: string };
}) {
  const supabase = await createClient();
  const userId = params.userId;

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

  const portfolioData = {
    user: userResult.data,
    projects: projectsResult.data || [],
    skills: skillsResult.data || [],
    experience: experienceResult.data || [],
    education: educationResult.data || [],
  };

  // Generate CV HTML and clean it
  const rawHTML = await generateCV(portfolioData);
  const cvHTML = cleanHTMLFromMarkdown(rawHTML);

  return <CVViewer cvHTML={cvHTML} userId={userId} />;
}
