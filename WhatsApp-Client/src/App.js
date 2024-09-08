import React, { useEffect, useState } from "react";
import "../src/App.css";
import ChatBar from "../src/ChatBar";
import SideBar from "../src/SideBar";
import { io } from "socket.io-client";
import { useSocket } from "./hooks/useSocket";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";

function App() {


  return (
    <div>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
      {/* <div className="app">
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
      </div> */}
    </div>
  );
}

export default App;
