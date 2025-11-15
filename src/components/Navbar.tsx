import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/signin');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f3f4f6',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem', color: '#111827' }}>
        ShopHub
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
              }}
            >
              {user.email}
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                minWidth: '160px',
              }}>
                <button
                  onClick={handleSignOut}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: '#111827',
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/auth/signin" style={{ textDecoration: 'none', color: '#7c3aed' }}>
              Sign In
            </Link>
            <Link to="/auth/signup" style={{ textDecoration: 'none', color: '#7c3aed' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
