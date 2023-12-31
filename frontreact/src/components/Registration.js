
import React, { useState } from 'react';
import axios from 'axios';

export const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/user/register/', {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handleSubmit}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Register</h3>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Username"
            name='username'
            type='text'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            name='email'
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />

            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Confirm password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </form>
    </div>
  )
};

