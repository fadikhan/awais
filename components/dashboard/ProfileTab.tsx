"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function ProfileTab({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [refinedBio, setRefinedBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setProfile(data);
      setName(data.name || "");
      setBio(data.bio || "");
      setRefinedBio(data.refined_bio || "");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("users")
      .update({ name, bio, refined_bio: refinedBio })
      .eq("id", userId);

    if (!error) {
      alert("Profile saved successfully!");
    }
    setLoading(false);
  };

  const handleRefine = async () => {
    if (!bio) return;
    setRefining(true);

    try {
      const response = await fetch("/api/gemini/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: bio, context: "bio" }),
      });

      const data = await response.json();
      setRefinedBio(data.refinedText);
    } catch (error) {
      alert("Failed to refine bio");
    } finally {
      setRefining(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about yourself..."
          />
          <Button
            onClick={handleRefine}
            disabled={refining || !bio}
            variant="outline"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {refining ? "Refining..." : "Refine with AI"}
          </Button>
        </div>

        {refinedBio && (
          <div className="space-y-2">
            <Label htmlFor="refined-bio">Refined Bio (AI-Enhanced)</Label>
            <Textarea
              id="refined-bio"
              value={refinedBio}
              onChange={(e) => setRefinedBio(e.target.value)}
              rows={4}
              className="bg-blue-50"
            />
          </div>
        )}

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
