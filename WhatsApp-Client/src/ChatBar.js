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
import { useSelector } from "react-redux";
import useSocket from "./hooks/useSocket";

function ChatBar({ userInfo }) {
  const { userInfo:userId } = useSelector((state) => state.auth);
  console.log("userInfo:::",userInfo);
  const [message, setMessage] = useState("");

  // Replace hardcoded values with dynamic ones from userInfo (if available)
  // const userId = "66e4811bac7e551824f6f138";
  // const recipientId = "66e480ccac7e551824f6f135";
console.log("userId:::",userId);
  const { messages, sendMessage } = useSocket(userId._id, userInfo?.recipientId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage(""); // Clear the input field
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
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default ChatBar;
