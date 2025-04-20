import { NextResponse } from "next/server"
import Razorpay from "razorpay"

// Initialize Razorpay with your key_id and key_secret
// Replace with your actual Razorpay credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
})

export async function POST(request: Request) {
  try {
    const { amount, wishId } = await request.json()

    if (!amount || !wishId) {
      return NextResponse.json({ error: "Amount and wishId are required" }, { status: 400 })
    }

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // amount in paise (2 rupees = 200 paise)
      currency: "INR",
      receipt: `wish_${wishId}`,
      payment_capture: 1, // Auto-capture payment
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}