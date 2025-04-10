import React from "react";
import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import './App.css'; 

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <header className="header">
            <div className="container">
              <h1 className="header-title">Welcome to E-Buy Shopping Website</h1>
            </div>
          </header>

          <main className="main-content">
            <AppRoutes />
          </main>

          <footer className="footer">
            <div className="container footer-container">
              <p>&copy; 2025 E-Buy Company</p>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;






