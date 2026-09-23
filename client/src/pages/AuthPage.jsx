import { useState } from 'react';
import { apiRequest } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage({ onSuccess, onMessage }) {
  const [mode, setMode] = useState('login');
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    const body = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await apiRequest(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(body) });
      if (mode === 'register') {
        setMode('login');
        onMessage('Account created. You can now sign in.');
      } else {
        login(result.token || result.Token);
        onSuccess();
      }
    } catch (error) {
      onMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return <section className="auth-card">
    <span className="eyebrow">YOUR LEARNING SPACE</span>
    <h1>{mode === 'login' ? 'Welcome back.' : 'Create an account.'}</h1>
    <p>Sign in to continue learning, or create an account to get started.</p>
    <form className="form" onSubmit={submit}>
      {mode === 'register' && <label>Name<input name="name" placeholder="Your name" required /></label>}
      <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
      <label>Password<input name="password" type="password" minLength="6" required /></label>
      {mode === 'register' && <label>Account type<select name="role" defaultValue="student"><option value="student">Student</option><option value="instructor">Instructor</option></select></label>}
      <button className="primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    </form>
    <p className="form-footer">{mode === 'login' ? 'New here?' : 'Already registered?'} <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
    <small className="token-hint">Your login token is saved in this browser with localStorage.</small>
  </section>;
}
