import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, QrCode, BarChart3 } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import AuthGuard from "@/components/AuthGuard";
import { getLinks } from "@/app/actions/links";

export default async function Dashboard() {
  const result = await getLinks();

  if (!result.success) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-red-500 mb-4">⚠️ Error loading links</div>
              <p className="text-muted-foreground">
                Please try refreshing the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    );
  }

  const links = result.links || [];

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your dynamic links</p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Link
            </Link>
          </Button>
        </div>

        {links.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No links yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first dynamic link to get started.
              </p>
              <Button asChild>
                <Link href="/create">Create Your First Link</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
