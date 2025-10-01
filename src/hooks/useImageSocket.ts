"use client";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Global socket instance with reference counting
let socket: Socket | null = null;
let subscribers = 0;

export function useImageSocket() {
  const [connected, setConnected] = useState<boolean>(false);
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  // Use refs to avoid stale closures
  const mountedRef = useRef(true);
  const setImageUpdateRef = useRef(setImageUpdate);
  const setConnectedRef = useRef(setConnected);

  // Keep refs up to date
  useEffect(() => {
    setImageUpdateRef.current = setImageUpdate;
    setConnectedRef.current = setConnected;
  });

  useEffect(() => {
    // Get user identifier
    const anonUserId = Cookies.get('anon_id');
    const userId = Cookies.get('user_id');
    const userIdentifier = userId || anonUserId;

    // If no identifier, reflect disconnected UI and exit early
    if (!userIdentifier) {
      setConnected(false);
      return;
    }

    // Mark component as mounted
    mountedRef.current = true;
    subscribers++;

    const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL;
    if (!wsUrl) {
      console.error("NEXT_PUBLIC_IMAGE_WS_URL is not defined. Please check your environment variables.");
      subscribers--;
      return;
    }

    // Create socket only once
    if (!socket) {
      socket = io(wsUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      console.log("Socket created:", wsUrl);
    }

    const onConnect = () => {
      console.log("Socket connected, emitting join for:", userIdentifier);
      setConnectedRef.current(true);
      // Emit join with the current user identifier
      if (userIdentifier && socket?.connected) {
        socket.emit("join", userIdentifier);
      }
    };

    const onImageUpdate = (data: any) => {
      console.log("Image update received:", data);
      if (!mountedRef.current) {
        console.log("Component unmounted, ignoring update");
        return;
      }
      setImageUpdateRef.current(data);
    };

    const onDisconnect = () => {
      console.log("Socket disconnected");
      setConnectedRef.current(false);
    };

    const onError = (error: Error) => {
      console.error("Socket error:", error);
      setConnectedRef.current(false);
    };

    // Attach event listeners
    socket.on("connect", onConnect);
    socket.on("image-status-update", onImageUpdate);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    // If already connected, sync state and emit join
    if (socket.connected) {
      console.log("Socket already connected");
      onConnect();
    }

    // Cleanup function
    return () => {
      console.log("Component unmounting, cleaning up");
      mountedRef.current = false;
      subscribers--;

      // Remove this component's listeners
      socket?.off("connect", onConnect);
      socket?.off("image-status-update", onImageUpdate);
      socket?.off("disconnect", onDisconnect);
      socket?.off("error", onError);

      // Disconnect socket when no more subscribers
      // Use setTimeout to allow for quick remounts (like during dev hot reload)
      setTimeout(() => {
        if (subscribers <= 0 && socket) {
          console.log("No more subscribers, disconnecting socket");
          socket.disconnect();
          socket = null;
        }
      }, 100);
    };
  }, []); // Empty dependency array - only run once per mount

  return { connected, imageUpdate };
}
