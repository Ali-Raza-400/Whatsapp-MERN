import React from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { chatData } from "./db";

function SideBar({ setUserInfo }) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars.githubusercontent.com/u/80849102?v=4" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* Search Bar Code  */}
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Type Some Text" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {chatData.map((chat) => {
          console.log("chat", chat);
          return (
            <div
              onClick={() => {
                console.log("I am clicked");
                setUserInfo({
                  userId: chat.userId,
                  roomName: chat.roomName,
                });
              }}
            >
              <SidebarChat
                key={chat.userId}
                roomName={chat.roomName}
                lastMessage={chat.lastMessage}
                setUserInfo={setUserInfo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
