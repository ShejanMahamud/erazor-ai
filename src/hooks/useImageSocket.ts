"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface ImageUpdate {
  bgRemovedImageUrlHQ?: string
  bgRemovedImageUrlLQ?: string
  status?: string
  progress?: number
}

export function useImageSocket() {
  const [imageUpdate, setImageUpdate] = useState<ImageUpdate | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io({
      path: process.env.NEXT_PUBLIC_IMAGE_WS_URL,
      transports: ["websocket"],
    })

    socketInstance.on("connect", () => {
      console.log("Socket connected")
    })

    socketInstance.on("imageUpdate", (data: ImageUpdate) => {
      console.log("Image update received:", data)
      setImageUpdate(data)
    })

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return { imageUpdate, socket }
}
