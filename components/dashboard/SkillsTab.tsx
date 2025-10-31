"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Skill } from "@/types/database.types";

export default function SkillsTab({ userId }: { userId: string }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadSkills();
  }, [userId]);

  const loadSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setSkills(data);
  };

  const handleAdd = async () => {
    if (!skillName || !proficiency) return;

    await supabase
      .from("skills")
      .insert([{ skill_name: skillName, proficiency, user_id: userId }]);

    setSkillName("");
    setProficiency("");
    loadSkills();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id);
    loadSkills();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g., React, Python"
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Input
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                placeholder="e.g., Expert, Intermediate"
              />
            </div>
          </div>
          <Button onClick={handleAdd}>Add Skill</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{skill.skill_name}</h3>
                  <p className="text-sm text-gray-600">{skill.proficiency}</p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
