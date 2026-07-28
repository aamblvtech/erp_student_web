import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socket = null;

/**
 * Connect to the realtime Socket.IO server.
 * @param {string} token - JWT auth token
 */
export function connectSocket(token) {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socket.on("connect", () => {
    console.log("[Realtime] Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.warn("[Realtime] Connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("[Realtime] Disconnected:", reason);
  });

  return socket;
}

/**
 * Disconnect the current socket connection.
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Get the current socket instance (may be null).
 */
export function getSocket() {
  return socket;
}

/**
 * Subscribe to a realtime event.
 * @param {string} event
 * @param {Function} callback
 */
export function onEvent(event, callback) {
  if (socket) socket.on(event, callback);
}

/**
 * Unsubscribe from a realtime event.
 * @param {string} event
 * @param {Function} [callback]
 */
export function offEvent(event, callback) {
  if (socket) socket.off(event, callback);
}
