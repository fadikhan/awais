"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2 } from "lucide-react";
import type { Experience } from "@/types/database.types";

export default function ExperienceTab({ userId }: { userId: string }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    description: "",
    refined_description: "",
    start_date: "",
    end_date: "",
  });
  const [refining, setRefining] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadExperiences();
  }, [userId]);

  const loadExperiences = async () => {
    const { data } = await supabase
      .from("experience")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: false });

    if (data) setExperiences(data);
  };

  const handleSave = async () => {
    if (editingId) {
      await supabase
        .from("experience")
        .update(formData)
        .eq("id", editingId);
    } else {
      await supabase
        .from("experience")
        .insert([{ ...formData, user_id: userId }]);
    }

    setFormData({
      company_name: "",
      role: "",
      description: "",
      refined_description: "",
      start_date: "",
      end_date: "",
    });
    setEditingId(null);
    loadExperiences();
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company_name: exp.company_name,
      role: exp.role,
      description: exp.description,
      refined_description: exp.refined_description || "",
      start_date: exp.start_date,
      end_date: exp.end_date || "",
    });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("experience").delete().eq("id", id);
    loadExperiences();
  };

  const handleRefine = async () => {
    if (!formData.description) return;
    setRefining(true);

    try {
      const response = await fetch("/api/gemini/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: formData.description, context: "experience" }),
      });

      const data = await response.json();
      setFormData({ ...formData, refined_description: data.refinedText });
    } catch (error) {
      alert("Failed to refine description");
    } finally {
      setRefining(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Experience" : "Add New Experience"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <Button
              onClick={handleRefine}
              disabled={refining || !formData.description}
              variant="outline"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {refining ? "Refining..." : "Refine with AI"}
            </Button>
          </div>

          {formData.refined_description && (
            <div className="space-y-2">
              <Label>Refined Description</Label>
              <Textarea
                value={formData.refined_description}
                onChange={(e) => setFormData({ ...formData, refined_description: e.target.value })}
                rows={3}
                className="bg-blue-50"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date (Leave empty if current)</Label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Experience
            </Button>
            {editingId && (
              <Button variant="outline" onClick={() => {
                setEditingId(null);
                setFormData({
                  company_name: "",
                  role: "",
                  description: "",
                  refined_description: "",
                  start_date: "",
                  end_date: "",
                });
              }}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{exp.role}</h3>
                  <p className="text-sm text-gray-600">{exp.company_name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.start_date} - {exp.end_date || "Present"}
                  </p>
                  <p className="text-sm mt-2">
                    {exp.refined_description || exp.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(exp)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
