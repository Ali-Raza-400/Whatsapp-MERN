import { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize socket connection outside the hook to avoid re-connection on each re-render
const socket = io("http://localhost:5000");

const useSocket = (userId, recipientId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userId && recipientId) {
      // Generate the roomId by sorting user IDs
      const roomId = [userId, recipientId].sort().join('-');
      
      // Join the room
      socket.emit("joinRoom", { roomId });

      // Listen for incoming messages
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Leave the room when switching users or unmounting
      return () => {
        socket.emit("leaveRoom", { roomId });
        socket.off("message"); // Unsubscribe from message event to prevent duplication
      };
    }
  }, [userId, recipientId]); // Re-run effect when userId or recipientId changes

  // Send message function
  const sendMessage = (message) => {
    if (message.trim()) {
      const roomId = [userId, recipientId].sort().join('-');
      socket.emit("sendMessage", { roomId, message });
      setMessages((prevMessages) => [...prevMessages, message]); // Update local message list
    }
  };

  // Clean up the socket when the component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return { messages, sendMessage };
};

export default useSocket;
