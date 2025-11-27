import { notFound } from "next/navigation";
import QRCodeCard from "@/components/QRCodeCard";
import AuthGuard from "@/components/AuthGuard";
import { getLinks } from "@/app/actions/links";

async function getLink(id: string) {
  const result = await getLinks();

  if (!result.success || !result.links) {
    return null;
  }

  // Find the specific link that belongs to the current user
  return result.links.find((link) => link.id === id) || null;
}

export default async function QRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await getLink(id);

  if (!link) {
    notFound();
  }

  const shortUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/r/${link.slug}`;

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <QRCodeCard url={shortUrl} slug={link.slug} />
      </div>
    </AuthGuard>
  );
}
