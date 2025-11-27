import { prisma } from "../prisma";

export interface User {
  id: string;
  username: string;
  birthday: string;
}

function parseBirthday(birthday: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return null;

  const [year, month, day] = birthday.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export async function getOrCreateUser(
  username: string,
  birthday: string
): Promise<User | null> {
  try {
    const birthdayDate = parseBirthday(birthday);
    if (!birthdayDate) return null;

    let user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      user = await prisma.user.create({
        data: { username, birthday: birthdayDate },
      });
    } else {
      const stored = user.birthday.toISOString().slice(0, 10);
      if (stored !== birthday) return null;
    }

    return {
      id: user.id,
      username: user.username,
      birthday: user.birthday.toISOString().slice(0, 10),
    };
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    return null;
  }
}
