"use client";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Global socket instance with reference counting
let socket: Socket | null = null;
let subscribers = 0;
let connectionPromise: Promise<void> | null = null;

export function useImageSocket() {
  const [connected, setConnected] = useState<boolean>(false);
  const [imageUpdate, setImageUpdate] = useState<any>(null);

  // Use refs to avoid stale closures
  const mountedRef = useRef(true);
  const userIdentifierRef = useRef<string | null>(null);

  // Get user identifier once and store in ref
  useEffect(() => {
    const anonUserId = Cookies.get('anon_id');
    const userId = Cookies.get('user_id');
    userIdentifierRef.current = userId || anonUserId || null;
  }, []);

  useEffect(() => {
    const userIdentifier = userIdentifierRef.current;

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
    }

    const onConnect = () => {
      if (!mountedRef.current) return;
      setConnected(true);
      // Emit join with the current user identifier
      const currentIdentifier = userIdentifierRef.current;
      if (currentIdentifier && socket?.connected) {
        socket.emit("join", currentIdentifier);
      }
    };

    const onImageUpdate = (data: any) => {
      if (!mountedRef.current) return;
      setImageUpdate(data);
    };

    const onDisconnect = () => {
      if (!mountedRef.current) return;
      setConnected(false);
    };

    const onError = (error: Error) => {
      if (!mountedRef.current) return;
      console.error("Socket error:", error);
      setConnected(false);
    };

    // Attach event listeners
    socket.on("connect", onConnect);
    socket.on("image-status-update", onImageUpdate);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    // If already connected, sync state and emit join
    if (socket.connected) {
      onConnect();
    }

    // Cleanup function
    return () => {
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
          socket.disconnect();
          socket = null;
          connectionPromise = null;
        }
      }, 100);
    };
  }, []); // Empty dependency array - only run once per mount

  return { connected, imageUpdate };
}
