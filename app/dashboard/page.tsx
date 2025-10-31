"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import ProfileTab from "@/components/dashboard/ProfileTab";
import ProjectsTab from "@/components/dashboard/ProjectsTab";
import SkillsTab from "@/components/dashboard/SkillsTab";
import ExperienceTab from "@/components/dashboard/ExperienceTab";
import EducationTab from "@/components/dashboard/EducationTab";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleViewPortfolio = () => {
    router.push(`/portfolio/${user?.id}`);
  };

  const handleGenerateCV = () => {
    window.open(`/cv/${user?.id}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleViewPortfolio} variant="outline">
              View Portfolio
            </Button>
            <Button onClick={handleGenerateCV} variant="outline">
              Generate CV
            </Button>
            <Button onClick={handleSignOut} variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab userId={user?.id} />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsTab userId={user?.id} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsTab userId={user?.id} />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceTab userId={user?.id} />
          </TabsContent>

          <TabsContent value="education">
            <EducationTab userId={user?.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
