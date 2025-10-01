"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useImageSocket() {
  const anonUserId = Cookies.get('anon_id') || null;
  const userId = Cookies.get('user_id') || null;
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  useEffect(() => {
    if (!userId && !anonUserId) return;

    if (!socket) {
      const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL;

      socket = io(wsUrl, {
        transports: ["websocket"],
      });

      // Connect handler
      socket.on("connect", () => {
        console.log("[Socket] Connected, joining room:", userId || anonUserId);
        socket!.emit("join", userId || anonUserId);
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
      console.log("[Socket] Socket already connected, joining room:", userId || anonUserId);
      socket.emit("join", userId || anonUserId);
    }

    // Cleanup: Don't disconnect, just remove this component's listeners
    return () => {
      console.log("[Socket] Component unmounting, keeping socket alive");
    };
  }, [userId, anonUserId]);

  return { imageUpdate };
}
