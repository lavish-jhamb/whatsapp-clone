import React, { useEffect, useState } from "react";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import MicIcon from "@material-ui/icons/Mic";
import db from "./firebase";
import firebase from "firebase";

import whatsAppBg from "../src/img/whatsapp_bg.png";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [room, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.random() * 4000);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    const chatBody = document.querySelector(".chat_body");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [input]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header_left">
          <Avatar
            src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`}
          ></Avatar>
        </div>
        <div className="chat_header_center">
          <h3>{room}</h3>
          <p>
            last seen
            <span style={{ marginLeft: "5px" }}>
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </span>
          </p>
        </div>
        <div className="chat_header_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* CHAT BODY */}
      <div
        className="chat_body"
        style={{ backgroundImage: `url(${whatsAppBg})` }}
      >
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* TYPE A MESSAGE */}
      <div className="footer">
        <div className="footer_left">
          <SentimentSatisfiedOutlinedIcon />
        </div>

        <div className="footer_center">
          <form className="send_message" action="">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
            <button onClick={sendMessage} type="submit">
              send message
            </button>
          </form>
        </div>

        <div className="right">
          <MicIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
