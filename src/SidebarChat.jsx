import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMsg(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // CLEVER DB WORK
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar
          src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`}
        ></Avatar>
        <div className="sidebar_chatInfo">
          <h3>{name}</h3>
          <p>{msg[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="createNewChat">
      <h2>Add a Chat</h2>
    </div>
  );
}

export default SidebarChat;
