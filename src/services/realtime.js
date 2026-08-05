import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socket = null;
const eventListeners = new Map();

/**
 * Connect to the realtime Socket.IO server.
 * @param {string} [token] - Optional JWT auth token
 */
export function connectSocket(token) {
  if (socket?.connected) return socket;

  const authHeader = token || localStorage.getItem("erp_student_token") || localStorage.getItem("erp_token") || localStorage.getItem("erp_teacher_token");

  socket = io(SOCKET_URL, {
    auth: authHeader ? { token: authHeader } : undefined,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socket.on("connect", () => {
    console.log("[Realtime] Connected:", socket.id);
    // Re-bind all registered listeners
    for (const [evt, callbacks] of eventListeners) {
      for (const cb of callbacks) {
        socket.off(evt, cb);
        socket.on(evt, cb);
      }
    }
  });

  socket.on("connect_error", (err) => {
    console.warn("[Realtime] Connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("[Realtime] Disconnected:", reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  if (!socket) {
    connectSocket();
  }
  return socket;
}

export function onEvent(event, callback) {
  if (!eventListeners.has(event)) {
    eventListeners.set(event, new Set());
  }
  eventListeners.get(event).add(callback);

  const s = getSocket();
  if (s) {
    s.off(event, callback);
    s.on(event, callback);
  }
}

export function offEvent(event, callback) {
  if (eventListeners.has(event)) {
    eventListeners.get(event).delete(callback);
  }
  if (socket) {
    socket.off(event, callback);
  }
}
