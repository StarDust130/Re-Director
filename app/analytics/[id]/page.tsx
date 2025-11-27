import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Calendar,
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { getLinks } from "@/app/actions/links";

async function getLinkWithAnalytics(id: string) {
  const result = await getLinks();

  if (!result.success || !result.links) {
    return null;
  }

  // Find the specific link that belongs to the current user
  const link = result.links.find((link) => link.id === id);

  if (!link) {
    return null;
  }

  // Get full analytics data for this link
  const linkWithScans = await prisma.link.findUnique({
    where: { id },
    include: {
      scans: {
        orderBy: { timestamp: "desc" },
        take: 100, // Last 100 scans for better analytics
      },
    },
  });

  return linkWithScans;
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await getLinkWithAnalytics(id);

  if (!link) {
    notFound();
  }

  // Calculate analytics
  const totalScans = link.scanCount;
  const deviceStats = link.scans.reduce((acc, scan) => {
    acc[scan.deviceType || "unknown"] =
      (acc[scan.deviceType || "unknown"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countryStats = link.scans.reduce((acc, scan) => {
    acc[scan.country || "unknown"] = (acc[scan.country || "unknown"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const deviceChartData = Object.entries(deviceStats).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill:
      name === "mobile"
        ? "#8884d8"
        : name === "desktop"
        ? "#82ca9d"
        : name === "tablet"
        ? "#ffc658"
        : "#ff7300",
  }));

  const countryChartData = Object.entries(countryStats)
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      value,
    }));

  // Daily scans over last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const dailyScans = last7Days.map((date) => {
    const scansOnDate = link.scans.filter(
      (scan) => scan.timestamp.toISOString().split("T")[0] === date
    ).length;
    return { date: date.split("-")[2], scans: scansOnDate };
  });

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Analytics for {link.slug}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Track how your link is performing.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScans}</div>
              <p className="text-xs text-muted-foreground">Lifetime scans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unique Countries
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(countryStats).length}
              </div>
              <p className="text-xs text-muted-foreground">Geographic reach</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Device</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {Object.entries(deviceStats).sort(
                  ([, a], [, b]) => b - a
                )[0]?.[0] || "None"}
              </div>
              <p className="text-xs text-muted-foreground">
                Most used device type
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Created</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {link.createdAt.toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Link creation date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={countryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Scans Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Scans (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyScans}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {link.scans.slice(0, 50).map((scan) => (
                <div
                  key={scan.id}
                  className="flex justify-between items-center text-sm p-2 rounded border"
                >
                  <div className="flex items-center space-x-2">
                    {scan.deviceType === "mobile" && (
                      <Smartphone className="h-4 w-4" />
                    )}
                    {scan.deviceType === "desktop" && (
                      <Monitor className="h-4 w-4" />
                    )}
                    {scan.deviceType === "tablet" && (
                      <Tablet className="h-4 w-4" />
                    )}
                    <span className="capitalize">{scan.deviceType}</span>
                    <span className="text-muted-foreground">from</span>
                    <Badge variant="outline">{scan.country}</Badge>
                  </div>
                  <span className="text-muted-foreground">
                    {new Date(scan.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
              {link.scans.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No scans yet. Share your QR code to start tracking!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
