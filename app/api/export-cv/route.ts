import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCV } from "@/lib/gemini/client";
import { cleanHTMLFromMarkdown } from "@/lib/utils/textCleaner";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch all user data
    const [userResult, projectsResult, skillsResult, experienceResult, educationResult] = await Promise.all([
      supabase.from("users").select("*").eq("id", userId).single(),
      supabase.from("projects").select("*").eq("user_id", userId),
      supabase.from("skills").select("*").eq("user_id", userId),
      supabase.from("experience").select("*").eq("user_id", userId),
      supabase.from("education").select("*").eq("user_id", userId),
    ]);

    const portfolioData = {
      user: userResult.data,
      projects: projectsResult.data || [],
      skills: skillsResult.data || [],
      experience: experienceResult.data || [],
      education: educationResult.data || [],
    };

    // Generate CV content using Gemini (returns HTML) and clean it
    const rawHTML = await generateCV(portfolioData);
    const cvHTML = cleanHTMLFromMarkdown(rawHTML);

    // Create a complete HTML document with styling
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.user.name} - CV</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { margin: 0; padding: 20px; }
      .no-print { display: none; }
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
<body class="bg-gray-50 p-8">
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg print:shadow-none">
    ${cvHTML}
  </div>
  
  <div class="max-w-4xl mx-auto mt-4 text-center no-print">
    <button onclick="window.print()" class="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
      Download as PDF
    </button>
  </div>
</body>
</html>`;

    // Return as HTML
    return new NextResponse(fullHTML, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: any) {
    console.error("CV generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate CV" },
      { status: 500 }
    );
  }
}
