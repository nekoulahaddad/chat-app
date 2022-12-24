import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import db from "../../../utils/firebase";

import "./styles.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("please enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link
      to={{
        pathname: `/room/${id}`,
      }}
    >
      <div className="SidebarChat">
        <img
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          className="chatImg"
          alt="chatImg"
        />
        <div className="SidebarChat_INFO">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="SidebarChat">
      <div className="SidebarChat_INFO">
        <h2>Add a new chat</h2>
      </div>
    </div>
  );
}

export default SidebarChat;
