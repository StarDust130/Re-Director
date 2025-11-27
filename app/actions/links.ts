"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createLinkSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9-_]+$/),
  targetUrl: z.string().url(),
});

export async function createLink(formData: FormData) {
  try {
    const slug = formData.get("slug");
    const targetUrl = formData.get("targetUrl");

    if (!slug || !targetUrl) {
      return { success: false, error: "Missing required fields" };
    }

    const data = {
      slug: slug as string,
      targetUrl: targetUrl as string,
    };

    const validated = createLinkSchema.parse(data);

    // Check if slug already exists
    const existing = await prisma.link.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return { success: false, error: "Slug already exists" };
    }

    await prisma.link.create({
      data: validated,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message =
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Validation error";
      return { success: false, error: message };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function updateLink(id: string, formData: FormData) {
  try {
    const slug = formData.get("slug");
    const targetUrl = formData.get("targetUrl");

    if (!slug || !targetUrl) {
      return { success: false, error: "Missing required fields" };
    }

    const data = {
      slug: slug as string,
      targetUrl: targetUrl as string,
    };

    const validated = createLinkSchema.parse(data);

    // Check if slug exists for another link
    const existing = await prisma.link.findFirst({
      where: { slug: validated.slug, id: { not: id } },
    });

    if (existing) {
      return { success: false, error: "Slug already exists" };
    }

    await prisma.link.update({
      where: { id },
      data: validated,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message =
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Validation error";
      return { success: false, error: message };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function deleteLink(id: string) {
  try {
    await prisma.link.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "An error occurred" };
  }
}
