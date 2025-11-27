export interface User {
  username: string;
  birthday: string;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem("user");
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}
