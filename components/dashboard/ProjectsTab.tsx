"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types/database.types";

export default function ProjectsTab({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    refined_description: "",
    project_link: "",
    image_url: "",
  });
  const [refining, setRefining] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadProjects();
  }, [userId]);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setProjects(data);
  };

  const handleSave = async () => {
    if (editingId) {
      await supabase
        .from("projects")
        .update(formData)
        .eq("id", editingId);
    } else {
      await supabase
        .from("projects")
        .insert([{ ...formData, user_id: userId }]);
    }

    setFormData({
      title: "",
      description: "",
      refined_description: "",
      project_link: "",
      image_url: "",
    });
    setEditingId(null);
    loadProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      refined_description: project.refined_description || "",
      project_link: project.project_link || "",
      image_url: project.image_url || "",
    });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  };

  const handleRefine = async () => {
    if (!formData.description) return;
    setRefining(true);

    try {
      const response = await fetch("/api/gemini/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: formData.description, context: "project" }),
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
          <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
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

          <div className="space-y-2">
            <Label>Project Link</Label>
            <Input
              value={formData.project_link}
              onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Project
            </Button>
            {editingId && (
              <Button variant="outline" onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  description: "",
                  refined_description: "",
                  project_link: "",
                  image_url: "",
                });
              }}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {project.refined_description || project.description}
                  </p>
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
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
