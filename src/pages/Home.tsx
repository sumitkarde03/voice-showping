import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function Home() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>Welcome to ShopHub</h1>
      {user ? (
        <div>
          <p>Hello, {user.email}! Welcome to your AI-powered shopping experience.</p>
          <p>This is your personalized shopping dashboard.</p>
          <div style={{ marginTop: '2rem' }}>
            <h2>Features</h2>
            <ul>
              <li>Voice-powered product search</li>
              <li>AI-driven recommendations</li>
              <li>Quick checkout</li>
              <li>Order tracking</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <p>Start shopping with voice commands. Sign in or create an account to get started.</p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/auth/signin" style={{ marginRight: '1rem', color: '#7c3aed', textDecoration: 'underline' }}>
              Sign In
            </Link>
            <Link to="/auth/signup" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
