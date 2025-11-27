"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, QrCode, BarChart3, ExternalLink } from "lucide-react";
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
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/edit/${link.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/qr/${link.id}`}>
              <QrCode className="h-4 w-4 mr-1" />
              QR
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/analytics/${link.id}`}>
              <BarChart3 className="h-4 w-4 mr-1" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Test
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
