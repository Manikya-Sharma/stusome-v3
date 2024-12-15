import { db } from "@/lib/db";
import { getDefaultProfilePreferences } from "@/lib/utils";
import { profile_post_zod } from "@/types/api-routes/profile";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Invalid request. Must provide email" },
      {
        status: 400,
      }
    );
  }

  const profile = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!profile) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  const parse = profile_post_zod.safeParse(await req.json());
  if (!parse.success) {
    return NextResponse.json(
      {
        message: parse.error,
      },
      {
        status: 400,
      }
    );
  }
  const { displayName, username, email, externalId } = parse.data;

  const existing = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (existing) {
    return NextResponse.json(
      { message: "User already exists" },
      {
        status: 400,
      }
    );
  }

  try {
    await db.user.create({
      data: {
        displayName,
        username,
        email,
        externalId,
        preferences: getDefaultProfilePreferences(),
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "username not unique" },
          { status: 400 }
        );
      }
    }
  }

  return NextResponse.json({ message: "OK" });
}
