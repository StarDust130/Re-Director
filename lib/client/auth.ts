import type { User } from "../server/auth";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
  // notify other parts of the app in the same tab
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("authChange"));
  }
}

export function logout(): void {
  localStorage.removeItem("user");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("authChange"));
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}
