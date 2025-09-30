import React, {useState} from 'react'
export function RegisterPage(props){
  const [storeEmail, setEmail] = useState('');
  const [storePassword, setPassword] = useState('')
  const [storeUsername, setUsername] = useState('')
  const [storePasswordConfirm, setPasswordConfirm] = useState('')
    return(                    
      <> 
      <div id="registerUsername">Username: <input id="registerUsernameTextbox" placeholder="Enter username here ..."
      value={storeUsername}
      onChange={(event) => setUsername(event.target.value)}
      ></input></div>        

      {props.registerEmptyUsername && (
      <div id="registerEmptyUsernameErrorBox">Error: Username cannot be empty</div>
      )}

      <div id="registerEmail">Email: <input id="registerTextbox" placeholder="Enter email here ..."
      value={storeEmail}
      onChange={(event) => setEmail(event.target.value)}
      ></input></div>

      {props.registerEmptyEmail && (
      <div id="registerEmptyEmailErrorBox">Error: Email cannot be empty</div>
      )}
      {props.registerDuplicateUserError && (
      <div id="registerDuplicateUserErrorBox">Error: Account with email already exists</div>
      )}
      {props.registerInvalidEmailError && (
      <div id="registerInvalidEmailErrorBox">Error: Invalid email address</div>
      )}

      <div id="registerPassword">Password: <input id="registerPasswordTextbox" placeholder="Enter password here ..."
      value={storePassword}
      onChange={(event) => setPassword(event.target.value)}
      type = "password"></input></div>

      {props.registerEmptyPassword && (
      <div id="registerEmptyPasswordErrorBox">Error: Password cannot be empty</div>
      )}
      {props.registerInvalidPasswordError && (
      <div id="registerInvalidPasswordErrorBox">Error: Password cannot contain username or email id</div>
      )}

      <div id="registerPasswordConfirm">Confirm Password: <input id="registerPasswordTextboxConfirm" placeholder="Confirm password here ..." 
      value={storePasswordConfirm}
      onChange={(event) => setPasswordConfirm(event.target.value)}
      type = "password"></input></div>

      {props.registerEmptyPasswordConfirm && (
      <div id="registerEmptyPasswordConfirmErrorBox">Error: Confirm password cannot be empty</div>
      )}
      {props.registerMismatchPassword && (
      <div id="registerMismatchPasswordErrorBox">Error: Confirm password and password are mismatched</div>
      )}

      <div><button class="signUpButton" onClick={() => { 
          // props.loginPageFunc(); 
          props.addToUsersFunc(storeEmail,storePassword, storePasswordConfirm, storeUsername)
          }}>
          Sign Up
          </button></div>
        
        <div><button id="backButtonRegister" onClick={() => { 
          props.openWelcomePageFunc()
          }}>Back</button></div>
      </>
    );
}