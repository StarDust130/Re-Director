import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QRCodeCard from "@/components/QRCodeCard";
import AuthGuard from "@/components/AuthGuard";

async function getLink(id: string) {
  return await prisma.link.findUnique({
    where: { id },
  });
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
