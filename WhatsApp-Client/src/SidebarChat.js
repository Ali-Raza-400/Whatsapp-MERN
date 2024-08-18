import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";

function SidebarChat({ setUserInfo, roomName, lastMessage, key }) {
    console.log("key:::",key);
  return (
    <div
    
      className="sidebarChat"
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{roomName}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
