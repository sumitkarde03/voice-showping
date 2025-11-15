import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase will handle the callback automatically
    // This page just needs to exist for the redirect
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        {error ? (
          <div style={{ color: '#dc2626' }}>{error}</div>
        ) : (
          <div>Processing authentication...</div>
        )}
      </div>
    </div>
  );
}
