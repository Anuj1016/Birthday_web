"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Sample gallery images - replace with your actual photos of you and Anurag
  const images = [
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Anurag and I at college",
      caption: "First day of college together",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Birthday celebration last year",
      caption: "Last year's birthday bash",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Road trip memories",
      caption: "That epic road trip we took",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Hanging out",
      caption: "Just another day hanging out",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Festival celebration",
      caption: "Celebrating Holi together",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Graduation day",
      caption: "Graduation day memories",
    },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return

    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % images.length)
    } else {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-center">{image.caption}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={closeLightbox}
            >
              <X size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft size={24} />
            </Button>

            <div className="relative max-w-4xl max-h-[80vh]">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={800}
                height={600}
                className="max-h-[80vh] w-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                {images[selectedImage].caption}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20 rounded-full"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
