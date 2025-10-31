"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Education } from "@/types/database.types";

export default function EducationTab({ userId }: { userId: string }) {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution_name: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
  });
  const supabase = createClient();

  useEffect(() => {
    loadEducation();
  }, [userId]);

  const loadEducation = async () => {
    const { data } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", userId)
      .order("start_year", { ascending: false });

    if (data) setEducation(data);
  };

  const handleSave = async () => {
    const dataToSave = {
      ...formData,
      start_year: parseInt(formData.start_year),
      end_year: formData.end_year ? parseInt(formData.end_year) : null,
    };

    if (editingId) {
      await supabase
        .from("education")
        .update(dataToSave)
        .eq("id", editingId);
    } else {
      await supabase
        .from("education")
        .insert([{ ...dataToSave, user_id: userId }]);
    }

    setFormData({
      institution_name: "",
      degree: "",
      field_of_study: "",
      start_year: "",
      end_year: "",
    });
    setEditingId(null);
    loadEducation();
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution_name: edu.institution_name,
      degree: edu.degree,
      field_of_study: edu.field_of_study,
      start_year: edu.start_year.toString(),
      end_year: edu.end_year ? edu.end_year.toString() : "",
    });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("education").delete().eq("id", id);
    loadEducation();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Education" : "Add New Education"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Institution Name</Label>
            <Input
              value={formData.institution_name}
              onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g., Bachelor's, Master's"
              />
            </div>
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input
                value={formData.field_of_study}
                onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Year</Label>
              <Input
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
                placeholder="2020"
              />
            </div>
            <div className="space-y-2">
              <Label>End Year (Leave empty if current)</Label>
              <Input
                type="number"
                value={formData.end_year}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              {editingId ? "Update" : "Add"} Education
            </Button>
            {editingId && (
              <Button variant="outline" onClick={() => {
                setEditingId(null);
                setFormData({
                  institution_name: "",
                  degree: "",
                  field_of_study: "",
                  start_year: "",
                  end_year: "",
                });
              }}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{edu.degree} in {edu.field_of_study}</h3>
                  <p className="text-sm text-gray-600">{edu.institution_name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.start_year} - {edu.end_year || "Present"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(edu)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(edu.id)}
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
