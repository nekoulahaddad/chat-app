import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarChat from "./sidebarChat";
import db from "../../utils/firebase";
import { useStateValue } from "../../StateProvider";

import "./styles.css";

function Sidebar() {
  const [rooms, setRooms] = useState("");
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="Sidebar">
      <div className="Sidebar_header">
        {user ? (
          <div className="useInfo">
            <img src={user.photoURL} className="profileImg" alt="user_photo" />
            <span className="userName">{user.displayName}</span>
          </div>
        ) : (
          <FontAwesomeIcon icon="user" size="lg" />
        )}
      </div>
      <div className="Sidebar_chats">
        <SidebarChat addNewChat />
        {rooms &&
          rooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
