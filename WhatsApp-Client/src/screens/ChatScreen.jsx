import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import ChatBar from "../ChatBar";
import { useSocket } from "../hooks/useSocket";
import { useGetAllUsersQuery } from "../slices/usersApiSlice";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const socket = useSocket();
  const userList=useGetAllUsersQuery()
  useEffect(()=>{
    if(userList.status==="success"){
      console.log("userList success:::",userList.data);
    }
  },[userList])


  console.log("userList:::",userList);

  useEffect(() => {
    if (userInfo && socket) {
      socket.emit("joinRoom", userInfo);
    }
  }, [userInfo, socket]);
  return (
    <div className="app">
      <div className="app__body">
        <SideBar
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          data={userList.data}
        />
        <ChatBar
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
};

export default ChatScreen;
