// hooks/useImageSocket.ts
"use client";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Singleton Socket getter
function getSocket() {
  if (!socket) {
    const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL!;
    socket = io(wsUrl, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("[Socket] Connected", socket!.id);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("[Socket] Disconnected:", reason);
    });

    socket.on("connect_error", (error: Error) => {
      console.error("[Socket] Connection error:", error.message);
    });
  }
  return socket;
}

export function useImageSocket() {
  const userId = Cookies.get("user_id") || Cookies.get("anon_id") || null;
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  // Use a ref to store latest handler, avoids stale closures
  const imageUpdateRef = useRef((data: any) => setImageUpdate(data));

  useEffect(() => {
    if (!userId) return;

    const s = getSocket();

    // Join user room
    if (s.connected) {
      s.emit("join", userId);
    } else {
      s.once("connect", () => s.emit("join", userId));
    }

    // Event handler
    const handler = (data: any) => {
      imageUpdateRef.current({ ...data, timestamp: Date.now() });
    };
    s.on("image-status-update", handler);

    // Cleanup only removes listeners, keeps socket alive
    return () => {
      s.off("image-status-update", handler);
    };
  }, [userId]);

  return { imageUpdate };
}
