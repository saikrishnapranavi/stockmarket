import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useGoogleLogin } from '@react-oauth/google';
import '../Components/AuthToggle.css'; // Add your CSS here

const AuthToggle = () => {
  const [isSignup, setIsSignup] = useState(false); // State for toggling between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  // Toggle between Login and Signup views
  const toggleAuthView = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
  };

  // Handle Manual Signup
  const handleManualSignUp = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const response = await axios.post('http://localhost:5000/api/users/signup', {
        email,
        password: hashedPassword,
      });

      if (response.status === 200) {
        alert('User created successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      const { token, userId } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your credentials.');
    }
  };

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => setGoogleUser(response),
    onError: (error) => console.error('Google Login Failed:', error),
  });

  // Fetch Google Profile
  useEffect(() => {
    const fetchGoogleProfile = async () => {
      if (googleUser) {
        try {
          const profileResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: 'application/json',
              },
            }
          );

          const { email, name } = profileResponse.data;

          const response = await axios.post('http://localhost:5000/api/users/google-signup', {
            email,
            name,
          });

          if (response.status === 200) {
            alert('Logged in successfully!');
            navigate('/home');
          }
        } catch (error) {
          console.error('Error fetching Google user profile:', error);
        }
      }
    };

    fetchGoogleProfile();
  }, [googleUser, navigate]);

  return (
    <div className={`auth-container ${isSignup ? 'signup-mode' : ''}`}>
      <div className="form-wrapper">
        {isSignup ? (
          <form onSubmit={handleManualSignUp} className="signup-form">
            <h2>Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-auth">Sign Up</button>
            <p>
              Already have an account?{' '}
              <span className="toggle-link" onClick={toggleAuthView}>
                Login
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-auth">Login</button>
            <p>
              Don't have an account?{' '}
              <span className="toggle-link" onClick={toggleAuthView}>
                Sign Up
              </span>
            </p>
          </form>
        )}
        <div className="divider">or</div>
        <div className="social-login">
          <button className="google-btn" onClick={() => googleLogin()}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default AuthToggle;
