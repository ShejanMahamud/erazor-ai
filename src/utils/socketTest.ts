// Test WebSocket connection utility
export const testSocketConnection = () => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    console.log('🔍 Testing WebSocket connection to:', wsUrl);

    if (!wsUrl) {
        console.error('❌ NEXT_PUBLIC_WS_URL is not defined');
        return false;
    }

    try {
        const socket = new WebSocket(wsUrl + '/test');

        socket.onopen = () => {
            console.log('✅ WebSocket test connection successful');
            socket.close();
        };

        socket.onerror = (error) => {
            console.error('❌ WebSocket test connection failed:', error);
        };

        socket.onclose = (event) => {
            console.log('🔌 WebSocket test connection closed:', event.code, event.reason);
        };

        return true;
    } catch (error) {
        console.error('❌ WebSocket test connection error:', error);
        return false;
    }
};
