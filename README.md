# Re-Director

A dynamic QR-based URL redirector built with Next.js 16, TypeScript, and TailwindCSS.

## Features

- Create dynamic links with unique slugs (/r/[slug])
- Change target URLs anytime without regenerating QR codes
- Generate and download QR codes
- Track analytics: total scans, device types, countries
- Mobile-first responsive UI with dark/light mode
- Clean, minimal design using shadcn/ui components

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **Database:** Prisma + SQLite
- **QR Generation:** qrcode npm package
- **Validation:** Zod
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

3. Seed sample data (optional):

   ```bash
   npm run db:seed
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── actions/          # Server actions for CRUD operations
├── analytics/[id]/   # Analytics page for each link
├── create/           # Create new link page
├── dashboard/        # Dashboard listing all links
├── edit/[id]/        # Edit link page
├── qr/[id]/          # QR code display page
├── r/[slug]/         # Redirect route handler
├── layout.tsx        # Root layout with theme provider
└── page.tsx          # Landing page

components/
├── ui/               # shadcn/ui components
├── CreateLinkForm.tsx
├── EditLinkForm.tsx
├── LinkCard.tsx
├── Navbar.tsx
└── QRCodeCard.tsx

lib/
└── prisma.ts         # Prisma client instance

prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Sample data seeder
```

## API Routes

- `GET /r/[slug]` - Redirect to target URL and record analytics
- Server actions handle CRUD operations for links

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

For deployment to platforms like Vercel, ensure the database is accessible (consider using a hosted database like Supabase for production).

## License

MIT

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
