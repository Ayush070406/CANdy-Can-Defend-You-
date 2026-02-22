import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Scale, MessageSquare, Calendar } from 'lucide-react';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale size={32} />
            CANdy
          </Link>
          <div className="navbar-nav">
            <Link to="/chat" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={18} />
              Ask Candy
            </Link>
            <Link to="/book" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} />
              Book Advocate
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', textAlign: 'center', backgroundColor: '#050505' }}>
        <p style={{ opacity: 0.6, fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} CANdy (Can Defend You). All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
