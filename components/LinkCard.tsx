"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  QrCode,
  BarChart3,
  ExternalLink,
  Copy,
} from "lucide-react";
import { deleteLink } from "@/app/actions/links";
import { useRouter } from "next/navigation";

interface LinkCardProps {
  link: {
    id: string;
    slug: string;
    targetUrl: string;
    scanCount: number;
    createdAt: Date;
  };
}

export default function LinkCard({ link }: LinkCardProps) {
  const router = useRouter();
  const shortUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/r/${link.slug}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy the URL. Please copy it manually.");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this link?")) {
      await deleteLink(link.id);
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {link.slug}
          </CardTitle>
          <Badge variant="secondary">{link.scanCount} scans</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Target URL</p>
          <p className="text-sm font-mono break-all">{link.targetUrl}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Short URL</p>
          <p className="text-sm font-mono break-all">{shortUrl}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={`/edit/${link.id}`}>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={`/qr/${link.id}`}>
              <QrCode className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">QR</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={`/analytics/${link.id}`}>
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs"
          >
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">
              {copied ? "Copied!" : "Copy"}
            </span>
            <span className="sm:hidden">{copied ? "✓" : "Copy"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-xs text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs col-span-2 sm:col-span-1"
          >
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Test Link</span>
              <span className="sm:hidden">Test</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
