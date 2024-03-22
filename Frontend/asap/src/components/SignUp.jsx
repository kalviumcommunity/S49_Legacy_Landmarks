import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [signedUp, setSignedUp] = useState(false);
  const userCookie = 'username'
  const [cookies, setCookie] = useCookies([userCookie]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://legacy-landmarks.onrender.com/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data,"from database")
  
      if (response.data.token) { 
        const cookieValue = formData.username;
        setSignedUp(true);
        setCookie(userCookie, cookieValue, { path: '/' });
        localStorage.setItem('user', formData.username);
        const userNameCookie = cookies[userCookie]
        const userNameLocal = localStorage.getItem('user');
        console.log('User signed up successfully', formData.username);
        console.log('cookie', userNameCookie);
        console.log('Local storage', userNameLocal);
        console.log('Token:', response.data.token); 
        navigate('/');
      }
    } catch (error) {
      alert(error.response.data.message)
      console.error('Error signing up user:', error);
    }
  };
  

  const handleLogout = () => {
    setCookie('username', null, { path: '/' });
    localStorage.removeItem('user');
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {!cookies.username ? (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {signedUp && (
            <div className="success-message">
              <p>Successfully signed up!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Welcome, {cookies.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
