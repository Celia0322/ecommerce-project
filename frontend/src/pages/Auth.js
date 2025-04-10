import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';
import "./Auth.css"; 

const Auth = () => {
  const { login, logout, user } = useContext(AuthContext);  // Get login, logout, and user from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); 
      navigate('/'); // Redirect to homepage or dashboard after successful login
    } catch (err) {
      setError("Invalid username or password.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Redirect to homepage or login page
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      {!user ? (
        <form onSubmit={handleLogin} className="auth-form">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="auth-input" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="auth-input" 
            required
          />
          <button type="submit" className="auth-btn">Login</button>
          {error && <p className="error-message">{error}</p>} 
          <p className="auth-link">Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      ) : (
        <div className="welcome-container">
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Auth;










