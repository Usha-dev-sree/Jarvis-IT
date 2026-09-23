import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ onNavigate, onMessage }) {
  const { token, logout } = useAuth();

  function handleSignOut() {
    logout();
    onNavigate('courses');
    onMessage('You are signed out.');
  }

  return <header className="navbar">
    <a className="brand" href="#courses" onClick={event => { event.preventDefault(); onNavigate('courses'); }}>learnly<span>.</span></a>
    <nav className="nav-links" aria-label="Main navigation">
      <button onClick={() => onNavigate('courses')}>Courses</button>
      {token
        ? <button className="nav-primary" onClick={handleSignOut}>Sign out</button>
        : <button className="nav-primary" onClick={() => onNavigate('auth')}>Sign in</button>}
    </nav>
  </header>;
}
