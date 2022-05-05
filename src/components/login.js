import React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import googleIcon from '../assets/svg/googleIcon.svg';
import './login.css';

const client_id =  '358597847515-pl4k0o9dj1hbb53tsifknsa7e560ci3j.apps.googleusercontent.com';

function Login() {
  const navigate = useNavigate();

    const onSuccess =(res) => {
      //google login success 
      navigate("/search");
      }

    const onFailure =(res) => {
        console.log("login failure:" + res);
    }


    return (
  <>
    <span className='loginTitle'>
      Book Search
    </span> 
    <div id="signInButton" className='loginBox'>    
      <div>
        <img src={googleIcon} alt="icon" className='googleIcon' style={{width: '15vw', height: '15vh'}}/>
      </div> 
      <div className='loginDescription'>     
        <span>
          Login to search for an author
        </span>
      </div>
      <div>
        <GoogleLogin
          clientId={client_id}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          className='loginButton'
          theme='light'
        ></GoogleLogin>
      </div>
    </div>
  </>
  )
}

export default Login;
