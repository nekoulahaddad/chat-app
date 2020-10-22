import React from "react";
import "./Login.css";
import {auth,provider} from "./firebase";
import {useStateValue} from "./StateProvider"
import {actionTypes} from "./reducer"


function Login(){

	const [{}, dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider)
		.then((result) => {
			dispatch({
			type:actionTypes.SET_USER,
			user:result.user
		});
		})
		.catch((err) => console.log(err.message))
		
	}
	return(
		<div className="login">
		<div className="login_container">
		<h2>Welcome to My Chat App! </h2>
		<button onClick={signIn}>Sign In With Google</button>
		</div>

		</div>

		)
}

export default Login;