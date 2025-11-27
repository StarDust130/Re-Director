import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample links
  const link1 = await prisma.link.create({
    data: {
      slug: "example",
      targetUrl: "https://example.com",
      scanCount: 42,
    },
  });

  const link2 = await prisma.link.create({
    data: {
      slug: "google",
      targetUrl: "https://google.com",
      scanCount: 15,
    },
  });

  // Create sample scans
  const scans = [];
  for (let i = 0; i < 50; i++) {
    scans.push({
      linkId: link1.id,
      deviceType: ["mobile", "desktop", "tablet"][
        Math.floor(Math.random() * 3)
      ],
      country: ["US", "UK", "CA", "DE", "FR", "JP"][
        Math.floor(Math.random() * 6)
      ],
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ), // Random date in last 30 days
    });
  }

  for (let i = 0; i < 15; i++) {
    scans.push({
      linkId: link2.id,
      deviceType: ["mobile", "desktop", "tablet"][
        Math.floor(Math.random() * 3)
      ],
      country: ["US", "UK", "CA", "DE", "FR", "JP"][
        Math.floor(Math.random() * 6)
      ],
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
    });
  }

  await prisma.scan.createMany({
    data: scans,
  });

  console.log("Sample data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
