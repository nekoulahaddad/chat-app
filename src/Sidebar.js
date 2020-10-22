import React ,{useState,useEffect} from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import db from "./firebase";
import {useStateValue} from "./StateProvider";

function Sidebar() {
const [rooms,setRooms] = useState('');
const [{user}, dispatch] = useStateValue();

useEffect(() => {
db.collection('rooms').onSnapshot(snapshot => (setRooms(snapshot.docs.map(doc=>({
    id:doc.id,
    data:doc.data(),
})))))
},[])


  return (
    <div className="Sidebar">
    <div className="Sidebar_header">
    {user ? <img src={user.photoURL} className="profileImg" alt="user_photo" />:<FontAwesomeIcon icon="user" size="lg" />} 
    </div>
    <div className="Sidebar_chats">
    <SidebarChat addNewChat />
    {rooms && rooms.map(room => (
        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
    </div>
    </div>
  );
}

export default Sidebar;