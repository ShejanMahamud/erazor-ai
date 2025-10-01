"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useImageSocket(userIdentifier: string | null) {
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  useEffect(() => {
    if (!userIdentifier) return;

    // Create socket once
    if (!socket) {
      const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL;
      if (!wsUrl) {
        console.error("[Socket] NEXT_PUBLIC_IMAGE_WS_URL not defined");
        return;
      }

      console.log("[Socket] Creating socket connection to:", wsUrl);
      socket = io(wsUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10,
      });

      // Connect handler
      socket.on("connect", () => {
        console.log("[Socket] Connected, joining room:", userIdentifier);
        socket!.emit("join", userIdentifier);
      });

      // Image update handler
      socket.on("image-status-update", (data: any) => {
        console.log("[Socket] Image update received:", data);
        setImageUpdate({ ...data, timestamp: Date.now() });
      });

      // Disconnect handler
      socket.on("disconnect", (reason: string) => {
        console.log("[Socket] Disconnected:", reason);
      });

      // Error handler
      socket.on("connect_error", (error: Error) => {
        console.error("[Socket] Connection error:", error.message);
      });
    } else if (socket.connected) {
      // Socket exists and is connected, just join the room
      console.log("[Socket] Socket already connected, joining room:", userIdentifier);
      socket.emit("join", userIdentifier);
    }

    // Cleanup: Don't disconnect, just remove this component's listeners
    return () => {
      console.log("[Socket] Component unmounting, keeping socket alive");
    };
  }, [userIdentifier]);

  return { imageUpdate };
}
