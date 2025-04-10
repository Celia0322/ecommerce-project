import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Include your styling if needed

const Register = () => {
  const [username, setUsername] = useState("");  // Store the username
  const [password, setPassword] = useState("");  // Store the password
  const [error, setError] = useState("");  // To handle errors
  const navigate = useNavigate();  // To redirect after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();
    
    console.log("Sending username:", username);  // Log the username
    console.log("Sending password:", password);  // Log the password

    try {
      // Send only username and password
      await axios.post('http://localhost:5001/auth/register', { username, password });
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error("Error registering:", err);  // Log the error
      setError("Registration failed. Please try again."); // Show error if registration fails
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="register-input" 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="register-input" 
          required
        />
        <button type="submit" className="register-btn">Register</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="register-link">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;




