"use client"

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null
let subscribers = 0

export function useImageSocket() {
  const [connected, setConnected] = useState<boolean>(!!socket?.connected)
  const [imageUpdate, setImageUpdate] = useState<any>(null)
  const userId = Cookies.get("user_id")
  const anonId = Cookies.get("anon_id")
  const userIdentifier = userId || anonId

  useEffect(() => {
    // If no identifier, reflect disconnected UI and exit early.
    if (!userIdentifier) {
      setConnected(false)
      return
    }

    subscribers++
    const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL
    if (!wsUrl) {
      throw new Error("NEXT_PUBLIC_IMAGE_WS_URL is not defined. Please check your environment variables.")
    }
    socket = io(wsUrl, {
      transports: ["websocket"],
    })

    const onConnect = () => {
      setConnected(true)
      // emit join for the current identifier (closure captures the current value)
      if (userIdentifier) socket?.emit("join", userIdentifier)
    }

    const onImageUpdate = (data: any) => setImageUpdate(data)
    const onDisconnect = () => setConnected(false)

    socket.on("connect", onConnect)
    socket.on("image-status-update", onImageUpdate)
    socket.on("disconnect", onDisconnect)

    // If the socket already connected before listeners were attached,
    // call onConnect() to sync state and emit join (once).
    if (socket.connected) {
      onConnect()
    }

    return () => {
      subscribers--
      socket?.off("connect", onConnect)
      socket?.off("image-status-update", onImageUpdate)
      socket?.off("disconnect", onDisconnect)

      setTimeout(() => {
        if (subscribers <= 0 && socket) {
          socket.disconnect()
          socket = null
        }
      }, 0)
    }
  }, [userIdentifier])

  return { connected, imageUpdate }
}
