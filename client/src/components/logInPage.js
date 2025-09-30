import React, {useState} from 'react'
export function LogInPage(props){
  const [storeEmail, setEmail] = useState('');
  const [storePassword, setPassword] = useState('')
    return(                    
      <>                                      
      <div id="loginEmail">Email: <input id="loginTextbox" placeholder="Enter email here ..."
      value={storeEmail}
      onChange={(event) => setEmail(event.target.value)}
      ></input></div>

      {props.loginEmptyEmailError && (
      <div id="loginEmptyEmailErrorBox">Error: Email cannot be empty</div>
      )}
      {props.loginIncorrectEmailError && (
      <div id="loginIncorrectEmailErrorBox">Error: Email is incorrect</div>
      )}

      <div id="loginPassword">Password: <input id="loginPasswordTextbox" placeholder="Enter password here ..."
      value={storePassword}
      onChange={(event) => setPassword(event.target.value)}
      type = "password"></input></div>

      {props.loginEmptyPasswordError && (
      <div id="loginEmptyPasswordErrorBox">Error: Password cannot be empty</div>
      )}
      {props.loginIncorrectPasswordError && (
      <div id="loginIncorrectPasswordErrorBox">Error: Password is incorrect</div>
      )}

      <div><button class="loginButton" onClick={() => { 
          props.testLoginFunc(storeEmail,storePassword)
          }}

      >Login</button></div>

      <div><button class="backButton" onClick={() => { 
          props.openWelcomePageFunc()
          }}>Back</button></div>
      </>
    );
}