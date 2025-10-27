import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";
import { calculateSessionPrice } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();
  const { slotId, notes } = body;

  // Get the slot
  const slot = await prisma.availabilitySlot.findUnique({
    where: { id: slotId },
    include: {
      engineer: {
        include: {
          profile: true,
        },
      },
      session: true,
    },
  });

  if (!slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }

  if (slot.session) {
    return NextResponse.json({ error: "Slot already booked" }, { status: 400 });
  }

  if (!slot.engineer.profile) {
    return NextResponse.json({ error: "Engineer profile not found" }, { status: 404 });
  }

  // Calculate price
  const price = calculateSessionPrice(
    slot.engineer.profile.hourlyRate,
    slot.start,
    slot.end,
    slot.engineer.profile.rushRate
  );

  // Create session
  const newSession = await prisma.session.create({
    data: {
      slotId: slot.id,
      artistId: user.id,
      status: slot.mode === "INSTANT" ? "PENDING" : "PENDING",
      notes,
      priceCents: price,
    },
    include: {
      slot: {
        include: {
          engineer: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // For instant booking, create Stripe checkout
  if (slot.mode === "INSTANT") {
    const checkoutSession = await createCheckoutSession({
      amount: price,
      sessionId: newSession.id,
      engineerName: slot.engineer.name || "Engineer",
      artistEmail: user.email!,
    });

    // Update session with checkout ID
    await prisma.session.update({
      where: { id: newSession.id },
      data: { stripeCheckoutId: checkoutSession.id },
    });

    return NextResponse.json({
      session: newSession,
      checkoutUrl: checkoutSession.url,
    }, { status: 201 });
  }

  // For request booking, just return the session
  return NextResponse.json({ session: newSession }, { status: 201 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookingSession = await prisma.session.findUnique({
    where: { id: params.id },
    include: {
      slot: {
        include: {
          engineer: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      artist: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      files: {
        orderBy: {
          createdAt: "desc",
        },
      },
      thread: {
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
    },
  });

  if (!bookingSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Check ownership
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (
    bookingSession.artistId !== user?.id &&
    bookingSession.slot.engineerId !== user?.id
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(bookingSession);
}
