import React from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { chatData } from "./db";
 let chatDatas = [
  { userId: 1, roomName: "Room 1", lastMessage: "Hello from Room 1" },
  { userId: 2, roomName: "Room 2", lastMessage: "Hello from Room 2" },
  { userId: 3, roomName: "Room 3", lastMessage: "Hello from Room 3" },
  // Add more objects as needed
];

function SideBar({ setUserInfo,data }) {
  console.log("data::::",data);
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
        {data?.user?.map((chat) => {
          console.log("chat", chat);
          return (
            <div
              onClick={() => {
                console.log("I am clicked");
                setUserInfo({
                  userId: chat?.userId,
                  roomName: chat?.roomName,
                });
              }}
            >
              <SidebarChat
                key={chat?.userId}
                roomName={chat?.username|| chat?.name}
                lastMessage={chat?.email}
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
