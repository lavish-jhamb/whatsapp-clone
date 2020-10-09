import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";

import WhatsappLogin from "../src/img/whatsapp-login.jpg";
import { useStateValue } from "./StateProvider";

import { actionTypes } from "./Reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login_body">
        <h3>Welcome to WhatsApp</h3>
        <div className="login_img">
          <img src={WhatsappLogin} alt="login_img" />
        </div>
        <small>
          Tag 'Agree and Continue' to accept the whatsapp term of services and
          privacy policy
        </small>
        <div className="google_login">
          <button type="submit" onClick={signIn}>
            Agree & Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
