"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useImageSocket(userIdentifier: string | null) {
  const [connected, setConnected] = useState(false);
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  useEffect(() => {
    if (!userIdentifier) {
      console.log("🔌 No user identifier, skipping socket connection");
      setConnected(false);
      return;
    }

    console.log("🔌 Initializing socket connection for:", userIdentifier);

    if (!socket) {
      console.log("🔌 Creating new socket instance");
      socket = io(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}`, {
        transports: ["websocket"],
      });
    } else {
      console.log("🔌 Reusing existing socket instance");
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);
      setConnected(true);
      console.log("🔌 Emitting join event for:", userIdentifier);
      socket?.emit("join", userIdentifier);
    });

    socket.on("image-status-update", (data) => {
      console.log("📸 Image update received:", data);
      setImageUpdate(data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    });

    return () => {
      console.log("🔌 Cleaning up socket for:", userIdentifier);
      socket?.off("connect");
      socket?.off("image-status-update");
      socket?.off("disconnect");
      if (socket) {
        socket.disconnect();
        socket = null;
        console.log("🔌 Socket instance destroyed");
      }
    };
  }, [userIdentifier]);

  return { connected, imageUpdate };
}
