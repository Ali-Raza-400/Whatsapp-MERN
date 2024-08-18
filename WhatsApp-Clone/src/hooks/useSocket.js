// import { SOCKET_URI } from "@/config";
import { useEffect, useRef } from "react";
import io from "socket.io-client";


export function useSocket() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3500');

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected:", socketRef.current.id);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
}
