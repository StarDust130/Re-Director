"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Moon, Sun, QrCode, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, logout, isLoggedIn } from "@/lib/auth";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <QrCode className="h-6 w-6" />
            <span className="font-bold text-xl">Re-Director</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn() ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="text-sm font-medium hover:underline"
                >
                  Create
                </Link>
                <span className="text-sm text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {user?.username}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium hover:underline"
              >
                Login
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
