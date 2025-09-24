import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let imageSocketInstance: Socket | null = null;

export const useImageSocket = (clerkId: string) => {
  console.log('🎯🎯🎯 useImageSocket called with:', { clerkId, type: typeof clerkId });
  console.warn('⚠️⚠️⚠️ THIS IS A WARNING LOG FROM useImageSocket');
  console.error('❌❌❌ THIS IS AN ERROR LOG FROM useImageSocket');

  const [imageUpdates, setImageUpdates] = useState<any[]>([]);

  const clearImageUpdates = useCallback(() => {
    setImageUpdates([]);
  }, []);

  useEffect(() => {
    console.log('🔍 Socket effect triggered with clerkId:', clerkId);

    if (!clerkId || clerkId.trim() === '') {
      console.warn('⚠️ No valid user ID provided for image socket connection');
      return;
    }

    console.log('🔌 Initializing image socket connection for user:', clerkId);
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL + '/images';
    console.log('🔗 WebSocket URL:', wsUrl);
    console.log('🔍 Environment check:', {
      hasWsUrl: !!process.env.NEXT_PUBLIC_WS_URL,
      wsUrlValue: process.env.NEXT_PUBLIC_WS_URL
    });

    // Clean up existing connection if any
    if (imageSocketInstance) {
      console.log('🧹 Cleaning up existing socket connection');
      imageSocketInstance.disconnect();
    }

    console.log('🚀 Creating new socket instance...');

    // Try different transport options if websocket fails
    imageSocketInstance = io(
      wsUrl,
      {
        transports: ['websocket', 'polling'], // Add polling as fallback
        forceNew: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        upgrade: true, // Allow transport upgrade
        rememberUpgrade: false // Don't remember transport type
      }
    );

    console.log('📊 Socket instance created, state:', imageSocketInstance.connected);

    // Add a connection timeout
    const connectionTimeout = setTimeout(() => {
      if (imageSocketInstance && !imageSocketInstance.connected) {
        console.error('❌ Socket connection timeout after 10 seconds');
        console.log('🔍 Socket state:', {
          connected: imageSocketInstance.connected,
          disconnected: imageSocketInstance.disconnected,
          id: imageSocketInstance.id
        });
      }
    }, 10000);

    imageSocketInstance.on('connect', () => {
      console.log('✅ Image socket connected successfully');
      console.log('🔍 Socket info:', {
        id: imageSocketInstance?.id,
        connected: imageSocketInstance?.connected,
        transport: imageSocketInstance?.io?.engine?.transport?.name
      });

      clearTimeout(connectionTimeout);

      // Join user-specific room
      imageSocketInstance?.emit('join', clerkId);
      console.log('📡 Emitted join event for user:', clerkId);
    });

    imageSocketInstance.on('connect_error', (error) => {
      console.error('❌ Image socket connection error:', error);
      console.log('🔍 Error details:', {
        message: error.message,
        stack: error.stack,
        ...(error as any) // Cast to any to access socket.io specific properties
      });
      clearTimeout(connectionTimeout);
    });

    imageSocketInstance.on('disconnect', (reason) => {
      console.warn('⚠️ Image socket disconnected:', reason);
    });

    // Listen for updates
    imageSocketInstance.on('image-status-update', (update) => {
      console.log('🔔 Received image status update:', update);
      setImageUpdates((prev) => [...prev, update]);
    });

    // Add connection acknowledgment listener
    imageSocketInstance.on('joined-room', (roomId) => {
      console.log('✅ Successfully joined room:', roomId);
    });

    return () => {
      clearTimeout(connectionTimeout);
      if (imageSocketInstance) {
        imageSocketInstance.off('connect');
        imageSocketInstance.off('connect_error');
        imageSocketInstance.off('disconnect');
        imageSocketInstance.off('image-status-update');
        imageSocketInstance.off('joined-room');
        imageSocketInstance.disconnect();
        imageSocketInstance = null;
      }
    };
  }, [clerkId]);

  return { imageUpdates, clearImageUpdates };
};