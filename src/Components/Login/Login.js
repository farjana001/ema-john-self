import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameWork, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFrameWork();

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
      handleResponse(res, true);
      })
  }
  
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
    handleResponse(res, true);
    })
  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
     handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })

    }
    e.preventDefault();
  }

  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div style={{ textAlign: 'center', margin: '10px', padding: '10px' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <button onClick={fbSignIn}>Facebook sign in</button>
      {
        user.isSignedIn && <div>
          <p>welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img style={{ width: '200px' }} src={user.photo} alt="" />
        </div>
      }

      <br />
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} type="text" name="name" />} <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Input your email address" required /> <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required /> <br />
        <input type="submit" value={newUser ? "sign up" : "sign in"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>{newUser ? 'signed up' : 'logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;
