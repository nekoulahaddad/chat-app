import React,{useEffect,useState} from 'react';
import './Chat.css';
import {useParams} from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import {useStateValue} from "./StateProvider";
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat() {

const [input,setInput] = useState("");
const {roomId} = useParams();
const [roomName,setRoomName] = useState("");
const [messages,setMessages] = useState([]);
const [{user}, dispatch] = useStateValue();


useEffect(()=>{
if (roomId){
  db.collection('rooms')
  .doc(roomId)
  .onSnapshot(snapshot => {
    setRoomName(snapshot.data().name)
  });
  db.collection("rooms")
  .doc(roomId)
  .collection("messages")
  .orderBy('timestamp',"asc")
  .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))))
}
},[roomId]) // when the roomId changes so do the function // onSnapshot make a listen with a real time


  const sendMessage = (e) => {
    e.preventDefault();
    
    if (input){
    db.collection("rooms")
  .doc(roomId)
  .collection("messages").add({
    name:user.displayName,
    message:input,
    timestamp:firebase.firestore.FieldValue.serverTimestamp() // it used cuz the time is deferent from user to user depending on where he lives

  })
    setInput("")
  }
  else console.log(input)
  }
  return (
    <div className="Chat">
       <div className="Chat_header">
        <h2>{roomName}</h2>
        </div>
    <div className="Chat_body">
    <ScrollToBottom className="messages">
    {messages.map(message => (
      <div>   
      <div className={`Chat_message ${message.name === user.displayName && "Chat_reciever" }`}>
      <div className="Chat_name">{message.name}</div>
      <span className="message">{message.message}</span>
      <span className="Chat_time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
      </div>
      </div>
      ))}
      </ScrollToBottom>
        {/*<div className={`Chat_message ${message.name === user.displayName && "Chat_reciever" }`}>
    hi guys

        </div>*/}

    </div>
         <div className="Chat_footer">
         <form>
         <input 
         type="text" 
         value={input}
         onChange={(e)=> setInput(e.target.value)}
         placeholder="type a message"
         />
         <button onClick={sendMessage} type="submit">send a message</button>
         </form>
    

         </div>

    </div>
  );
}

export default Chat;