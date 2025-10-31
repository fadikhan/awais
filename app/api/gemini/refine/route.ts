import { NextRequest, NextResponse } from "next/server";
import { refineText } from "@/lib/gemini/client";

export async function POST(request: NextRequest) {
  try {
    const { text, context } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const refinedText = await refineText(text, context);

    return NextResponse.json({ refinedText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    
    // Provide more helpful error messages
    let errorMessage = "Failed to refine text";
    if (error.message?.includes("API key")) {
      errorMessage = "Gemini API key is invalid or not configured. Please check your .env.local file.";
    } else if (error.message?.includes("quota")) {
      errorMessage = "API quota exceeded. Please check your Gemini API usage.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
