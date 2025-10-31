import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">AI Portfolio</span>
        </div>
        <div className="flex gap-4">
          <Link href="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Build Your Perfect Portfolio with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create stunning portfolio landing pages and professional CVs in minutes.
            Powered by Gemini AI to make your work shine.
          </p>
          <Link href="/auth">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Building Free
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Refinement</h3>
            <p className="text-gray-600">
              Let Gemini AI polish your bio, project descriptions, and experience to sound professional.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Portfolio Page</h3>
            <p className="text-gray-600">
              Get a beautiful, shareable portfolio website generated automatically from your data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">One-Click CV Export</h3>
            <p className="text-gray-600">
              Download a professionally formatted CV with all your refined content in seconds.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
