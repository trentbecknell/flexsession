import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const skill = searchParams.get("skill");
  const genre = searchParams.get("genre");
  const rateMax = searchParams.get("rateMax");
  const availability = searchParams.get("availability");

  const where: any = {
    role: "ENGINEER",
    profile: {
      isNot: null,
      inviteStatus: "APPROVED",
    },
  };

  if (skill) {
    where.profile.skills = {
      has: skill,
    };
  }

  if (genre) {
    where.profile.genres = {
      has: genre,
    };
  }

  if (rateMax) {
    where.profile.hourlyRate = {
      lte: parseInt(rateMax, 10),
    };
  }

  const profiles = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      image: true,
      profile: {
        select: {
          id: true,
          headline: true,
          skills: true,
          genres: true,
          hourlyRate: true,
          rushRate: true,
          minBlockHours: true,
          instantBook: true,
          city: true,
          country: true,
          credits: {
            take: 3,
            orderBy: {
              year: "desc",
            },
          },
        },
      },
      engineerSlots: availability
        ? {
            where: {
              isPublished: true,
              start: {
                gte: availability === "today" 
                  ? new Date() 
                  : new Date(),
              },
              end: {
                lte: availability === "today"
                  ? new Date(Date.now() + 24 * 60 * 60 * 1000)
                  : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            },
            take: 3,
            orderBy: {
              start: "asc",
            },
          }
        : {
            where: {
              isPublished: true,
              start: {
                gte: new Date(),
              },
            },
            take: 3,
            orderBy: {
              start: "asc",
            },
          },
    },
  });

  return NextResponse.json(profiles);
}
