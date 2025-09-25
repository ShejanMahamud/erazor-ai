"use client";

import { serverBaseUrl } from '@/config';
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useImageSocket(userId: string) {
  const [connected, setConnected] = useState(false);
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io(`${serverBaseUrl}/images`, {
        transports: ["websocket"],
      });
    }

    socket.on("connect", () => {
      console.log("✅ Connected:", socket?.id);
      setConnected(true);
      socket?.emit("join", userId);
    });

    socket.on("image-status-update", (data) => {
      console.log("📸 Image update:", data);
      setImageUpdate(data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
      setConnected(false);
    });

    return () => {
      socket?.off("connect");
      socket?.off("image-status-update");
      socket?.off("disconnect");
      socket?.disconnect();
      socket = null;
    };
  }, [userId]);

  return { connected, imageUpdate };
}
