import { redirect } from "next/navigation";
import CreateLinkForm from "@/components/CreateLinkForm";
import AuthGuard from "@/components/AuthGuard";

export default function CreatePage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Link</h1>
          <p className="text-muted-foreground">
            Create a dynamic link that you can update anytime.
          </p>
        </div>
        <CreateLinkForm />
      </div>
    </AuthGuard>
  );
}
