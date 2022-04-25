import React from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';

const client_id = '358597847515-pl4k0o9dj1hbb53tsifknsa7e560ci3j.apps.googleusercontent.com';

function Logout() {
    const navigate = useNavigate();
    
    const onSuccess =(res) => {
        //logout success
        navigate("/");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
            clientId={client_id}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
  );
}

export default Logout;