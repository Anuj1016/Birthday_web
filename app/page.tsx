"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, Heart, Camera } from "lucide-react"
import PhotoGallery from "@/components/photo-gallery"
import MusicPlayer from "@/components/music-player"
import { motion } from "framer-motion"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Show confetti animation on load
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200">
      {/* Confetti effect */}
      {showConfetti && <div id="confetti-container" className="fixed inset-0 z-50 pointer-events-none" />}

      {/* Hero section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Anurag's Photo"
            width={200}
            height={200}
            className="rounded-full border-4 border-white shadow-lg mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-purple-800 mb-4"
        >
          Happy Birthday Anurag!
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-purple-600 mb-8"
        >
          Celebrating our awesome friendship on your special day!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Camera className="mr-2 h-5 w-5" /> View Our Memories
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-700 hover:bg-purple-100"
            onClick={() => document.getElementById("wish-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Gift className="mr-2 h-5 w-5" /> Send Birthday Wish
          </Button>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce rounded-full bg-white shadow-md"
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>
      </section>

      {/* Music player */}
      <div className="fixed bottom-4 right-4 z-40">
        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>

      {/* Gallery section */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Our Friendship Journey</h2>
          <PhotoGallery />
        </div>
      </section>

      {/* Birthday cake section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-purple-800 mb-8">Make a Wish!</h2>
          <div className="relative mb-12">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Birthday Cake"
              width={600}
              height={400}
              className="rounded-lg shadow-xl mx-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              >
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Candle"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Wish form section */}
      <section id="wish-form" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Send Anurag a Birthday Wish</h2>
            <p className="text-center text-gray-600 mb-8">
              For just ₹2, you can send Anurag a special birthday message that will make his day even more memorable!
            </p>
            <div className="flex justify-center">
              <Link href="/send-wish">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Heart className="mr-2 h-5 w-5" /> Send a Wish for ₹2
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent wishes section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Birthday Wishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 shadow-md">
                <p className="italic text-gray-600 mb-4">
                  "Happy birthday Anurag! Wishing you all the happiness in the world. May all your dreams come true!"
                </p>
                <p className="font-semibold text-purple-700">- Friend {i}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-purple-900 text-white text-center">
        <p>Made with ❤️ for Anurag's Birthday</p>
        <p className="mt-2 text-purple-200">
          © {new Date().getFullYear()} |{" "}
          <Link href="/admin" className="underline">
            Admin
          </Link>
        </p>
      </footer>
    </main>
  )
}
