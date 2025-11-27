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
  const [deleting, setDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("Failed to copy the URL. Please copy it manually.");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this link?")) {
      setDeleting(true);
      await deleteLink(link.id);
      router.refresh();
      setDeleting(false);
    }
  };

  return (
    <Card className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl active:scale-100 motion-reduce:transform-none rounded-xl border-2 hover:border-primary/20 bg-linear-to-br from-background to-muted/10 animate-in fade-in-0 slide-in-from-bottom-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold truncate text-primary">
            {link.slug}
          </CardTitle>
          <Badge variant="secondary" className="animate-pulse">
            {link.scanCount} scans
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Target URL</p>
          <p className="text-sm font-mono break-all">{link.targetUrl}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Short URL</p>
          <div className="flex items-center gap-2 bg-muted/10 dark:bg-muted/20 p-2 rounded-md">
            <p className="text-sm font-mono break-all flex-1 select-all">
              {shortUrl}
            </p>
            <button
              onClick={handleCopy}
              aria-label="Copy short URL"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring hover:scale-110 active:scale-95 ${
                copied
                  ? "bg-green-600 text-white animate-bounce"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <Link href={`/edit/${link.id}`}>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="">Edit</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <Link href={`/qr/${link.id}`}>
              <QrCode className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="">QR</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <Link href={`/analytics/${link.id}`}>
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="">Analytics</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-destructive hover:text-destructive transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="">
              {deleting ? "Deleting..." : "Delete"}
            </span>
      
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs col-span-2 sm:col-span-1 transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>Visit Link</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
