import { notFound } from "next/navigation";
import EditLinkForm from "@/components/EditLinkForm";
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

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await getLink(id);

  if (!link) {
    notFound();
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Link</h1>
          <p className="text-muted-foreground">
            Update your dynamic link details.
          </p>
        </div>
        <EditLinkForm link={link} />
      </div>
    </AuthGuard>
  );
}
