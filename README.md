# 🚀 Re-Director 🌟

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chartjs&logoColor=white)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Dynamic QR Redirects & Analytics Platform** 📱🔗📊

_Transform static QR codes into powerful, updatable marketing tools with real-time insights!_


</div>

---

## ✨ Features

Re-Director empowers marketers, event organizers, and businesses to create dynamic QR codes that can be updated without reprinting. Track every scan with detailed analytics! 🎯

- 🔄 **Dynamic Redirects**: Change URLs anytime without regenerating QR codes
- 📱 **QR Code Generation**: Instant QR creation with downloadable high-res images
- 📊 **Advanced Analytics**: Track scans by device, country, and time with beautiful charts
- 🔐 **Simple Authentication**: Secure login with username and birthday
- 🎨 **Modern UI**: Sleek, responsive design with gradient titles and Lucide icons
- ⚡ **Fast & Accessible**: Built with Next.js for optimal performance
- 🗄️ **Flexible Database**: Prisma ORM supporting SQLite/PostgreSQL

---

## 🖼️ Screenshots

<div align="center">

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)  
_Dashboard with analytics charts and link management_

![QR Code](https://via.placeholder.com/400x400?text=QR+Code+Example)  
_Generated QR code ready for download_

</div>

---

## 🛠️ Installation

Get started in minutes! Follow these steps:

### Prerequisites

- Node.js 18+ 📦
- npm or yarn 📦

### Setup

1. **Clone the repository** 🌀

   ```bash
   git clone https://github.com/StarDust130/Re-Director.git
   cd re-director
   ```

2. **Install dependencies** 📥

   ```bash
   npm install
   ```

3. **Set up the database** 🗄️

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   # Optional: Seed with sample data
   npm run db:seed
   ```

4. **Start the development server** 🚀

   ```bash
   npm run dev
   ```

5. **Open your browser** 🌐
   Visit `http://localhost:3000` and start creating dynamic links!

---

## 📖 Usage

### For Users 👤

1. **Login** 🔑: Use your username and birthday to access the dashboard
2. **Create Links** ➕: Enter a slug and target URL to generate a QR code
3. **Download QR** 📥: Get high-quality PNG images for printing
4. **Track Analytics** 📈: View scan data in real-time charts

### For Developers 🧑‍💻

- **API Routes**: Check `/api/` for available endpoints
- **Database**: Use Prisma Studio for data management
  ```bash
  npx prisma studio
  ```

---

## 🔌 API

### Authentication

- `POST /api/auth` - Login with username and birthday

### Links

- `GET /api/links` - Get user's links
- `POST /api/links` - Create new link
- `PUT /api/links/[id]` - Update link
- `DELETE /api/links/[id]` - Delete link

### Redirects

- `GET /r/[slug]` - Dynamic redirect with analytics tracking

### Analytics

- `GET /api/analytics/[id]` - Get link analytics

---

## 🎨 UI Highlights

Our UI is designed to be cool and professional:

- **Gradient Titles** 🌈: Eye-catching hero sections
- **Lucide Icons** ✨: Consistent, modern iconography
- **Responsive Cards** 📱: Beautiful feature showcases
- **Dark/Light Mode** 🌙: Theme support with next-themes
- **Accessible Forms** ♿: Built with Radix UI components

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** 🍴 the repo
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request 🎉

### Development

- Run `npm run lint` for code quality
- Use TypeScript for type safety
- Follow the existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with ❤️ by [StarDust130](https://github.com/StarDust130)
