import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './login.css';
 
function LoginPage() {
 
  const [profile, setProfile] = useState(null);
 
  // Initialize Google Login
  const GoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
     
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`
        },
      })
        .then(respone => respone.json())
        .then(data => {
          console.log(data);
          setProfile(data);
        });
    },
 
    onError: () => console.log('Login Failed'),
  });
 
  const handleLogout = () => {
    setProfile(null);
  };

  return (
    <div>
    {!profile? (
      <div className='login-container'>
          <h1>Please sign in with your google account</h1>
          <button className="google-login-button" onClick={() => GoogleLogin()}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" width="20" height="20" />
              Sign in with Google
          </button>
      </div>
    ) : (
      <div className="profile">
          <img src={profile.picture} alt="Profile" />
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <button className="logout-button" onClick={handleLogout}>
              Logout
          </button>
      </div>
    )}
    </div>
  );

}

  
export default LoginPage;
