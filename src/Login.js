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
				<div className="loginButton" onClick={signIn}>
					<span>Sign In With Google</span>
					<i></i>
				</div>
			</div>
		</div>

		)
}

export default Login;