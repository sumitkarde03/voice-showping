import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { resetPassword, updatePassword } = useAuth();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message || 'Failed to send reset email');
      } else {
        setStep('reset');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await updatePassword(password);
      if (error) {
        setError(error.message || 'Failed to update password');
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/auth/signin'), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
        <h1>Password Updated</h1>
        <p>Your password has been updated successfully. Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
      <h1>Reset Password</h1>
      {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}

      {step === 'request' ? (
        <form onSubmit={handleRequestReset}>
          <p>Enter your email to receive a password reset link.</p>
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
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleUpdatePassword}>
          <p>Check your email for the reset link, then enter your new password here.</p>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxSizing: 'border-box' }}
            />
          </div>
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/auth/signin">Back to Sign In</Link>
      </p>
    </div>
  );
}
