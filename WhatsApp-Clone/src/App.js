import React, { useEffect, useState } from "react";
import "../src/App.css";
import ChatBar from "../src/ChatBar";
import SideBar from "../src/SideBar";
import { io } from "socket.io-client";
import { useSocket } from "./hooks/useSocket";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const socket = useSocket();

  useEffect(() => {
    if (userInfo && socket) {
      socket.emit("joinRoom", userInfo);
    }
  }, [userInfo, socket]);

  return (
    <div>
      <div className="app">
        <div className="app__body">
          <SideBar
            socket={socket}
            messages={messages}
            setMessages={setMessages}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
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
    </div>
  );
}

export default App;
