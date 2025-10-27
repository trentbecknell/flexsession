import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const profile = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      profile: {
        select: {
          id: true,
          headline: true,
          bio: true,
          skills: true,
          genres: true,
          hourlyRate: true,
          rushRate: true,
          minBlockHours: true,
          instantBook: true,
          city: true,
          country: true,
          credits: {
            orderBy: {
              year: "desc",
            },
          },
          samples: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      engineerSlots: {
        where: {
          isPublished: true,
          start: {
            gte: new Date(),
          },
          session: null, // Only available slots
        },
        orderBy: {
          start: "asc",
        },
        take: 20,
      },
    },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
