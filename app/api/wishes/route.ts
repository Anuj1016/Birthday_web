import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json()

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
        paid: false,
      },
    })

    return NextResponse.json({ wishId: wish.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating wish:", error)
    return NextResponse.json({ error: "Failed to create wish" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const wishes = await prisma.wish.findMany({
      where: {
        paid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })

    return NextResponse.json(wishes)
  } catch (error) {
    console.error("Error fetching wishes:", error)
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 })
  }
}