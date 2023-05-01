import { Link } from "react-router-dom";
import "../Auth.css";
import { buttonStyle } from "../styles";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let response;
    try {
      response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

    } catch (e) {
      console.log("error");
    }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      window.location.replace("/");

      console.log({ data });
    
  };

  return (
    <div className='fontMontserrat shadow-5 pa5 br3 main'>
      <div className='f1 b tc'>Login</div>
      <div className='mt4'>Email</div>
      <div>
        <input
          type='email'
          className='input'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mt4'>Password</div>
      <div className='mb4'>
        <input
          type='password'
          className='input'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='pt3 tc w-80 center'>
        <div
          className={`no-underline ${buttonStyle}`}
          onClick={() => handleLogin(email, password)}
        >
          Login
        </div>
      </div>
      <div className='flex pt4'>
        <div className='ma2'>Don't have an account?</div>
        <Link to='/register' className='no-underline black dib v-mid'>
          <div className={buttonStyle}>Register</div>
        </Link>
      </div>
    </div>
  );
}
