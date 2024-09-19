import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { useGetAllUsersQuery } from "./slices/usersApiSlice";

function SideBar({ setUserInfo, data, userList }) {
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
        {userList?.data?.user?.map((chat) => {
          console.log("chat", chat);
          return (
            <div
              onClick={() => {
                console.log("I am clicked");
                setUserInfo({
                  recipientId: chat?._id,
                  // roomName: chat?.roomName,
                });
              }}
            >
              <SidebarChat
                key={chat?.userId}
                roomName={chat?.username || chat?.name}
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
