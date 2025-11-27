"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Moon, Sun, QrCode, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, isLoggedIn, logout } from "@/lib/client/auth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUserState] = useState(() => getUser());

  useEffect(() => {
    const onAuth = () => setUserState(getUser());
    // update initial state (in case of SSR mismatch)
    onAuth();
    window.addEventListener("authChange", onAuth as EventListener);
    return () =>
      window.removeEventListener("authChange", onAuth as EventListener);
  }, []);

  const handleLogout = () => {
    logout();
    // Also clear cookie
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-lg sm:text-xl">Re-Director</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isLoggedIn() ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:underline hidden sm:inline"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="text-sm font-medium hover:underline hidden sm:inline"
                >
                  Create
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-muted-foreground flex items-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">{user?.username}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="h-8 w-8 p-0"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
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
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 p-0"
            >
              <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
