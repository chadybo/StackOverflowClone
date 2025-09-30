export function WelcomePage(props){
        return(                    
          <>                                      
          <div id="welcomeText">Welcome to Fake Stack Overflow!</div>
          <div><button class="logInButton" onClick={props.loginPageFunc}>Login</button></div>
          <div><button class="registerButton" onClick={props.registerPageFunc}>Register</button></div>
          <div><button class="guestButton" onClick={props.guestLoginFunc}>Guest</button></div>
          </>
        );
}