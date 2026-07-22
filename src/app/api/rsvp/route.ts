import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, companions, attending, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    const rsvp = await db.guestRsvp.create({
      data: {
        name: name.trim(),
        companions: Number(companions) || 0,
        attending: Boolean(attending),
        message: message?.trim() || null,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar tu confirmación" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.guestRsvp.count({
      where: { attending: true },
    });
    const total = await db.guestRsvp.count();
    return NextResponse.json({ confirmed: count, total });
  } catch {
    return NextResponse.json({ confirmed: 0, total: 0 });
  }
}