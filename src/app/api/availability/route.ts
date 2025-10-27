import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const engineerId = searchParams.get("engineerId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: any = {
    isPublished: true,
    session: null, // Only available slots
  };

  if (engineerId) {
    where.engineerId = engineerId;
  }

  if (from) {
    where.start = {
      gte: new Date(from),
    };
  }

  if (to) {
    where.end = {
      lte: new Date(to),
    };
  }

  const slots = await prisma.availabilitySlot.findMany({
    where,
    include: {
      engineer: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      start: "asc",
    },
  });

  return NextResponse.json(slots);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (user?.role !== "ENGINEER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { start, end, taskType, mode, isPublished } = body;

  const slot = await prisma.availabilitySlot.create({
    data: {
      engineerId: user.id,
      start: new Date(start),
      end: new Date(end),
      taskType,
      mode: mode || "INSTANT",
      isPublished: isPublished ?? true,
    },
  });

  return NextResponse.json(slot, { status: 201 });
}
