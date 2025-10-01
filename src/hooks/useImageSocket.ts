"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let subscribers = 0;
let currentRoom: string | null = null;

export function useImageSocket(userIdentifier: string | null) {
  const [connected, setConnected] = useState<boolean>(!!socket?.connected);
  const [imageUpdate, setImageUpdate] = useState<any>(null);
  const userIdentifierRef = useRef(userIdentifier);

  // Update ref when userIdentifier changes
  useEffect(() => {
    userIdentifierRef.current = userIdentifier;
  }, [userIdentifier]);

  useEffect(() => {
    if (!userIdentifier) {
      setConnected(false);
      return;
    }

    subscribers++;

    if (!socket) {
      const wsUrl = process.env.NEXT_PUBLIC_IMAGE_WS_URL;
      if (!wsUrl) throw new Error("NEXT_PUBLIC_IMAGE_WS_URL not defined");

      socket = io(wsUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        timeout: 10000,
      });
    }

    const joinRoom = () => {
      if (socket?.connected && userIdentifierRef.current && currentRoom !== userIdentifierRef.current) {
        console.log(`[Socket] Joining room for user: ${userIdentifierRef.current}`);
        socket.emit("join", userIdentifierRef.current);
        currentRoom = userIdentifierRef.current;
      } else if (currentRoom === userIdentifierRef.current) {
        console.log(`[Socket] Already in room: ${currentRoom}`);
      }
    };

    const onConnect = () => {
      console.log("[Socket] Connected");
      setConnected(true);
      currentRoom = null; // Reset room on new connection
      joinRoom();
    };

    const onImageUpdate = (data: any) => {
      console.log("[Socket] Image update received:", data);
      setImageUpdate({ ...data, timestamp: Date.now() });
    };

    const onDisconnect = (reason: string) => {
      console.log("[Socket] Disconnected:", reason);
      setConnected(false);
      currentRoom = null;
    };

    const onConnectError = (error: Error) => {
      console.error("[Socket] Connection error:", error);
      setConnected(false);
    };

    const onReconnect = (attemptNumber: number) => {
      console.log(`[Socket] Reconnected after ${attemptNumber} attempts`);
    };

    const onReconnectAttempt = (attemptNumber: number) => {
      console.log(`[Socket] Reconnection attempt ${attemptNumber}`);
    };

    // Attach event listeners
    socket.on("connect", onConnect);
    socket.on("image-status-update", onImageUpdate);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("reconnect", onReconnect);
    socket.on("reconnect_attempt", onReconnectAttempt);

    // If socket is already connected before listeners attach, join immediately
    if (socket.connected) {
      setConnected(true);
      joinRoom();
    }

    return () => {
      subscribers--;
      socket?.off("connect", onConnect);
      socket?.off("image-status-update", onImageUpdate);
      socket?.off("disconnect", onDisconnect);
      socket?.off("connect_error", onConnectError);
      socket?.off("reconnect", onReconnect);
      socket?.off("reconnect_attempt", onReconnectAttempt);

      if (subscribers <= 0 && socket) {
        console.log("[Socket] Disconnecting - no more subscribers");
        socket.disconnect();
        socket = null;
        currentRoom = null;
      }
    };
  }, [userIdentifier]);

  return { connected, imageUpdate };
}
