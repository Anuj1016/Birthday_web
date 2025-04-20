import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(wishes)
  } catch (error) {
    console.error("Error fetching admin wishes:", error)
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 })
  }
}