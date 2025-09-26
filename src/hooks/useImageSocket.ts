"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let subscribers = 0;

export function useImageSocket(userIdentifier: string | null) {
  const [connected, setConnected] = useState(socket?.connected || false);
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  useEffect(() => {
    if (!userIdentifier) {
      setConnected(false);
      return;
    }

    subscribers++;
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}`, {
        transports: ["websocket"],
      });
    }

    const onConnect = () => {
      setConnected(true);
      socket?.emit("join", userIdentifier);
    };

    const onImageUpdate = (data: any) => {
      setImageUpdate(data);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("image-status-update", onImageUpdate);
    socket.on("disconnect", onDisconnect);

    // If socket is already connected when this component mounts,
    // the 'connect' event might have been missed.
    // Manually trigger the connect logic.
    if (socket.connected) {
      onConnect();
    }

    return () => {
      subscribers--;
      socket?.off("connect", onConnect);
      socket?.off("image-status-update", onImageUpdate);
      socket?.off("disconnect", onDisconnect);

      if (subscribers === 0 && socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [userIdentifier]);

  return { connected, imageUpdate };
}
