import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ShieldCheck, UserPlus, Scale } from 'lucide-react';

export default function Home() {
    return (
        <div className="animate-fade-in">
            <section className="hero">
                <h1 className="hero-title">Understanding Laws.<br />Made Simple.</h1>
                <p className="hero-subtitle">
                    Meet CANdy (Can Defend You), your AI-powered legal companion. Demystify complex legal jargons and easily find advocate appointments.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/chat" className="btn btn-primary">
                        <MessageSquare size={18} /> Chat with Candy
                    </Link>
                    <Link to="/book" className="btn">
                        <UserPlus size={18} /> Book Advocate
                    </Link>
                </div>
            </section>

            <section className="features-grid">
                <div className="feature-card glass-panel">
                    <Scale size={48} className="feature-icon" />
                    <h3 style={{ marginBottom: '1rem' }}>Know Your Rights</h3>
                    <p style={{ color: '#888' }}>Our sophisticated chatbot, Candy, breaks down complex laws into easily understandable terms to empower your everyday life.</p>
                </div>
                <div className="feature-card glass-panel" style={{ transitionDelay: '0.1s' }}>
                    <ShieldCheck size={48} className="feature-icon" />
                    <h3 style={{ marginBottom: '1rem' }}>Instant Assistance</h3>
                    <p style={{ color: '#888' }}>Get 24/7 instant replies to your legal queries in a completely safe, private, responsive and professional environment.</p>
                </div>
                <div className="feature-card glass-panel" style={{ transitionDelay: '0.2s' }}>
                    <UserPlus size={48} className="feature-icon" />
                    <h3 style={{ marginBottom: '1rem' }}>Hire a Lawyer</h3>
                    <p style={{ color: '#888' }}>Easily schedule appointments and connect with top-rated advocates dedicated to defending your specific case.</p>
                </div>
            </section>
        </div>
    );
}
