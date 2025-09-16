import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let imageSocketInstance: Socket | null = null;

export const useAnonImageSocket = (userId: string | undefined) => {
  const [imageUpdates, setImageUpdates] = useState<any[]>([]);

  const clearImageUpdates = useCallback(() => {
    setImageUpdates([]);
  }, []);

  useEffect(() => {
    if (!userId) return;

    // Clean up existing connection if any
    if (imageSocketInstance) {
      imageSocketInstance.disconnect();
    }

    imageSocketInstance = io(
      process.env.NEXT_PUBLIC_WS_URL + '/images',
      {
        transports: ['websocket'],
        forceNew: true,
        autoConnect: true
      }
    );

    imageSocketInstance.on('connect', () => {
      // Join user-specific room
      imageSocketInstance?.emit('join', userId);
    });

    imageSocketInstance.on('connect_error', (error) => {
      console.error('❌ Image socket connection error:', error);
    });

    imageSocketInstance.on('disconnect', (reason) => {

      console.warn('⚠️ Disconnected from image socket:', reason);
    });

    // Listen for updates
    imageSocketInstance.on('image-status-update', (update) => {
      setImageUpdates((prev) => [...prev, update]);
    });

    return () => {
      if (imageSocketInstance) {
        imageSocketInstance.off('connect');
        imageSocketInstance.off('connect_error');
        imageSocketInstance.off('disconnect');
        imageSocketInstance.off('image-status-update');
        imageSocketInstance.disconnect();
        imageSocketInstance = null;
      }
    };
  }, [userId]);

  return { imageUpdates, clearImageUpdates };
};
