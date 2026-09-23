import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import './App.css';

function AppContent() {
  const [page, setPage] = useState('courses');
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  return <>   
    <Navbar onNavigate={setPage} onMessage={setMessage} />
    <main className="container">
      {message && <div className="message" role="status">{message}<button onClick={() => setMessage('')}>×</button></div>}
      {page === 'auth'
        ? <AuthPage onSuccess={() => { setPage('courses'); setMessage('You are signed in.'); }} onMessage={setMessage} />
        : <CoursesPage token={token} onMessage={setMessage} onSignIn={() => setPage('auth')} />}
    </main>
    <footer className="footer">Learnly · Keep learning, one course at a time.</footer>
  </>;
}

export default function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
