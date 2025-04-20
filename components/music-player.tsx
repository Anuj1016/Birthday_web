"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/birthday-song.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Audio playback failed:", e)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, setIsPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (isMuted && value[0] > 0) {
      setIsMuted(false)
    }
  }

  return (
    <div className="bg-white rounded-full shadow-lg p-3 flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-purple-100 text-purple-700"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>

      <div className="hidden md:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-purple-100 text-purple-700"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>

        <div className="w-24">
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}