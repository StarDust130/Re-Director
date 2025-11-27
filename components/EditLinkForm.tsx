"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateLink } from "@/app/actions/links";

interface EditLinkFormProps {
  link: {
    id: string;
    slug: string;
    targetUrl: string;
  };
}

export default function EditLinkForm({ link }: EditLinkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateLink(link.id, formData);
      if (result.success) {
        router.push("/dashboard");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={link.slug}
              placeholder="my-awesome-link"
              required
            />
            <p className="text-sm text-muted-foreground">
              This will be your short URL: /r/[slug]
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUrl">Target URL</Label>
            <Input
              id="targetUrl"
              name="targetUrl"
              type="url"
              defaultValue={link.targetUrl}
              placeholder="https://example.com"
              required
            />
            <p className="text-sm text-muted-foreground">
              The URL where visitors will be redirected
            </p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Update Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
