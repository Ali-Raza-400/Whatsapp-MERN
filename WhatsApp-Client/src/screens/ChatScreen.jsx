import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";
import ChatBar from "../ChatBar";
import SideBar from "../SideBar";
import { useGetAllUsersQuery } from "../slices/usersApiSlice";

const ChatScreen = ({}) => {
  const [userInfo, setUserInfo] = useState(null);
  const userList = useGetAllUsersQuery();


  return (
    <div className="app">
    <div className="app__body">
      <SideBar
        setUserInfo={setUserInfo}
        userList={userList}
      />
      <ChatBar userInfo={userInfo}
      />
    </div>
  </div>
  );
};

export default ChatScreen;
