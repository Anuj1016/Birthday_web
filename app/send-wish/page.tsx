"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

// Simple toast replacement
const toast = {
  // @ts-ignore
  toast: ({ title, description, variant }) => {
    alert(`${title}: ${description}`);
  }
};

export default function SendWishPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // First, create the wish in the database
      const wishResponse = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      })

      if (!wishResponse.ok) {
        throw new Error("Failed to save wish")
      }

      const { wishId } = await wishResponse.json()

      // Then, initialize the payment
      const paymentResponse = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 2,
          wishId,
        }),
      })

      if (!paymentResponse.ok) {
        throw new Error("Failed to initialize payment")
      }

      const { orderId, keyId } = await paymentResponse.json()

      // Initialize Razorpay
      const options = {
        key: keyId,
        amount: 200, // Amount in paise (2 rupees)
        currency: "INR",
        name: "Birthday Wish for Anurag",
        description: "Send a birthday wish to Anurag",
        order_id: orderId,
        handler: async (response: any) => {
          // Verify payment on the server
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              wishId,
            }),
          })

          if (verifyResponse.ok) {
            toast({
              title: "Success!",
              description: "Your birthday wish has been sent to Anurag!",
            })
            router.push("/thank-you")
          } else {
            toast({
              title: "Payment verification failed",
              description: "Please try again",
              variant: "destructive",
            })
          }
        },
        prefill: {
          name: name,
        },
        theme: {
          color: "#9333EA",
        },
      }

      // @ts-ignore - Razorpay is loaded via script
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <Card className="p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Send a Birthday Wish to Anurag</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Birthday Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday wish for Anurag..."
                rows={5}
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Pay ₹2 & Send Wish
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}