import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Record the scan
    const userAgent = request.headers.get("user-agent") || "";
    const deviceType = getDeviceType(userAgent);
    const country = getCountryFromIP(request); // In real app, use geo IP service

    await prisma.scan.create({
      data: {
        linkId: link.id,
        deviceType,
        country,
      },
    });

    // Update scan count
    await prisma.link.update({
      where: { id: link.id },
      data: { scanCount: { increment: 1 } },
    });

    // Redirect to target URL
    return NextResponse.redirect(link.targetUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet/i.test(userAgent)) return "tablet";
  return "desktop";
}

function getCountryFromIP(request: NextRequest): string {
  // In a real app, use a geo IP service
  // For demo, return dummy data
  const countries = ["US", "UK", "CA", "DE", "FR", "JP"];
  return countries[Math.floor(Math.random() * countries.length)];
}
