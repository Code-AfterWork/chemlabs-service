import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {Navigate} from "react-router-dom";

const AuthForm = styled.form`
  width: 500px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;


  h3 {
    text-align: center;
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 15px;

  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    outline: none;
  }

  button {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    color: #fff;
    background-color: #007bff;
    border: none;
    cursor: pointer;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://127.0.0.1:8000/user/login/", {
      email,
      password
    });

    const { access, refresh } = response.data.tokens;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    window.location.href = "/";
  };

  return (
    <AuthForm onSubmit={submit}>
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </AuthForm>
  );
};


// import axios from "axios";
// import {Navigate} from "react-router-dom";
// import {useState} from "react";

// export const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const submit = async e => {
//         e.preventDefault();

//         const response = await axios.post('http://127.0.0.1:8000/user/login/', {
//           email,
//           password

//         });

//         const { access, refresh } = response.data.tokens;

//         localStorage.setItem("accessToken", access);
//         localStorage.setItem("refreshToken", refresh);

//         window.location.href = '/'

//     }

//     return(
//         <div className="Auth-form-container">
//         <form className="Auth-form" onSubmit={submit}>
//           <div className="Auth-form-content">
//             <h3 className="Auth-form-title">Sign In</h3>
//             <div className="form-group mt-3">
//               <label>Email</label>
//               <input
//                 className="form-control mt-1"
//                 placeholder="Enter Email"
//                 name='email'
//                 type='text'
//                 value={email}
//                 required
//                 onChange={e => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input
//                 name='password'
//                 type="password"
//                 className="form-control mt-1"
//                 placeholder="Enter password"
//                 value={password}
//                 required
//                 onChange={e => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="d-grid gap-2 mt-3">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//     </div>

//     )
// }