import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function ChatBar({ setMessages, messages, socket, userInfo }) {
  console.log("messages:::=>",messages);
  const [inputValue, setInputValue] = useState("");

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not defined");
      return;
    }

    // Log to ensure useEffect is called and socket is valid
    console.log("useEffect called, Socket instance:", socket);

    // Listen for incoming messages from the server
    const messageListener = (message) => {
      console.log("Message received from backend:", message);
      setMessages((prevMessages) => [...prevMessages, message.message]);
    };

    // Subscribe to the "message" event
    socket.on("message", messageListener);

    // Clean up the listener when the component unmounts
    return () => {
      console.log("Cleaning up socket listener");
      socket.off("message", messageListener);
    };
  }, [socket, setMessages]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      console.log("Sending message:", inputValue);
      socket.emit("sendMessage", { userId: userInfo?.userId, message: inputValue });
      setInputValue(""); // Reset the input field after submitting
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>last scene</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p key={index} className="chat__message">
            <span className="chat__name">Ali</span>
            {message}
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Type a Message"
            value={inputValue}
            onChange={inputValueHandler}
          />
          <button type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default ChatBar;
