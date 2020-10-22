import React,{useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar.js"
import {useEffect} from 'react';
import Chat from "./Chat.js"
import Login from "./Login.js"
import {auth} from "./firebase";
import { library } from '@fortawesome/fontawesome-svg-core'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import {useStateValue} from "./StateProvider";
//import { fab,fas } from '@fortawesome/free-brands-svg-icons'
import {faUser, faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'

library.add(faUser,faCheckSquare, faCoffee)

function App() {
	const [log,setLog] = useState(false);
	const [{user},dispatch] = useStateValue();
	console.log("user is"+ user)


  return (
  	
    <div className="App">

     {!user ? (
    	<Login />
    	): (
    <div className="app_body">
        <Router>
        <Sidebar />
     <Switch>
     <Route path="/room/:roomId">
     <Chat />
     </Route>
    <Route path="/" >
     <Chat />
     </Route>
     </Switch>   
     </Router> 
    </div>
    )
    }

    </div>

  );
}

export default App;
