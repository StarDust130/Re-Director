import { prisma } from "./prisma";

export interface User {
  id: string;
  username: string;
  birthday: string;
}

export async function getOrCreateUser(
  username: string,
  birthday: string
): Promise<User | null> {
  try {
    // Parse birthday string to Date
    const birthdayDate = new Date(birthday);

    // Try to find existing user
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          username,
          birthday: birthdayDate,
        },
      });
    } else {
      // Verify birthday matches
      if (
        user.birthday.toISOString().split("T")[0] !==
        birthdayDate.toISOString().split("T")[0]
      ) {
        return null; // Birthday doesn't match
      }
    }

    return {
      id: user.id,
      username: user.username,
      birthday: user.birthday.toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    return null;
  }
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
