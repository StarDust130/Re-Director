"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/client/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const hasLocalStorage = isLoggedIn();
      const hasCookie = document.cookie.includes("user=");

      if (!hasLocalStorage && !hasCookie) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
