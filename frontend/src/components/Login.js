import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
const API_URL = 'http://52.14.92.240:80';
const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const signUp = () => {
        navigate("/Signup")
    }
    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
        };
        axios
        .post(`${API_URL}/login`, payload,{"Access-Control-Allow-Origin": true})
        .then(async res => { 
            try {
                if (res.status !== 200) {
                    console.log("fail")
                    setIsError(true);
                    setMessage(res.statusText);
                } else {
                    setIsError(false);
                    setMessage(res.statusText);
                    navigate("/Home", {state: {name: payload.name, email: payload.email}});
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => console.log(err));
    };

  return (
    <div>
      <h1>Login Page</h1>
      <br />
      <form>
      <label>Enter your email:
        <input
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      </form>
      <form>
      <label>Enter your username:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
    <form>
      <label>Enter your password:
        <input
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </form>
        <Button onClick={onSubmitHandler}>log in</Button>
        <Button onClick={signUp}>sign up</Button>
    </div>
  );
};
const Button = styled.button`
background-color: purple;
color: white;
font-size: 10px;
padding: 10px 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
&:disabled {
  color: grey;
  opacity: 0.7;
  cursor: default;
}
`;
export default Login;