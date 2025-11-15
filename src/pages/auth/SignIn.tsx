import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithMagicLink } = useAuth();

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message || 'Failed to sign in');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signInWithMagicLink(email);
      if (error) {
        setError(error.message || 'Failed to send magic link');
      } else {
        setLinkSent(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (linkSent) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
        <h1>Check Your Email</h1>
        <p>A magic link has been sent to {email}. Click it to sign in.</p>
        <button
          onClick={() => {
            setLinkSent(false);
            setUseMagicLink(false);
            setEmail('');
          }}
          style={{ marginTop: '1rem', color: '#7c3aed', textDecoration: 'underline', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <h1>Sign In</h1>
      {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={useMagicLink ? handleMagicLink : handlePasswordSignIn}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box' }}
          />
        </div>

        {!useMagicLink && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Loading...' : useMagicLink ? 'Send Magic Link' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => {
            setUseMagicLink(!useMagicLink);
            setPassword('');
            setError('');
          }}
          style={{ color: '#7c3aed', textDecoration: 'underline', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
        >
          {useMagicLink ? 'Use password instead' : 'Use magic link instead'}
        </button>
        <Link to="/auth/reset-password" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
          Forgot password?
        </Link>
      </div>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/auth/signup">Sign Up</Link>
      </p>
    </div>
  );
}
