import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, wishId } = await request.json()

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(text)
      .digest("hex")

    const isAuthentic = generatedSignature === razorpay_signature

    if (!isAuthentic) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Update the wish as paid
    await prisma.wish.update({
      where: { id: wishId },
      data: { paid: true },
    })

    // Record the payment
    await prisma.payment.create({
      data: {
        wishId,
        amount: 2, // 2 rupees
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "success",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}