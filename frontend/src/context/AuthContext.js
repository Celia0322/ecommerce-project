import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 从 localStorage 加载用户信息（如果存在）
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5001/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      const userInfo = { username, userId: response.data.userId };
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo)); // Store in localStorage
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Register function
  const register = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5001/auth/register", { username, password });
      if (response.data.message === "User registered successfully") {
        // Optionally auto-login after successful registration
        login(username, password);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};






