import React, { useState, useEffect } from 'react';
import { Calendar, UserPlus, CheckCircle2 } from 'lucide-react';

export default function Book() {
    const [appointments, setAppointments] = useState([]);
    const [form, setForm] = useState({ name: '', caseType: '', date: '', lawyer: 'Any Available Advocate' });
    const [submitted, setSubmitted] = useState(false);

    // Load from local DB
    useEffect(() => {
        const saved = localStorage.getItem('candy_appointments');
        if (saved) {
            setAppointments(JSON.parse(saved));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = { id: Date.now(), ...form, status: 'Pending Review' };
        const updated = [...appointments, newAppointment];
        setAppointments(updated);

        // Save to DB
        localStorage.setItem('candy_appointments', JSON.stringify(updated));
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: '', caseType: '', date: '', lawyer: 'Any Available Advocate' });
        }, 3000);
    };

    const lawyers = [
        "Any Available Advocate",
        "Adv. Vikram Singh (Criminal Law)",
        "Adv. Priya Sharma (Family Law)",
        "Adv. Rohan Desai (Corporate Law)",
        "Adv. Anil Kapoor (Civil Rights)"
    ];

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

            <div className="glass-panel">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <UserPlus size={28} /> Hire a Lawyer
                </h2>
                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--success-color)' }}>
                        <CheckCircle2 size={64} style={{ margin: '0 auto 1rem' }} />
                        <h3>Appointment Booked Successfully!</h3>
                        <p style={{ color: '#888', marginTop: '1rem' }}>Your data has been securely saved. Our team will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" required placeholder="Enter your full name"
                                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Case Type / Legal Issue</label>
                            <input type="text" required placeholder="Briefly describe your case"
                                value={form.caseType} onChange={e => setForm({ ...form, caseType: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Select Advocate</label>
                            <select value={form.lawyer} onChange={e => setForm({ ...form, lawyer: e.target.value })}>
                                {lawyers.map(lw => (
                                    <option key={lw} value={lw}>{lw}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Preferred Date</label>
                            <input type="date" required
                                value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                                style={{ colorScheme: 'dark' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Book Appointment</button>
                    </form>
                )}
            </div>

            <div className="glass-panel">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <Calendar size={28} /> Your Appointments
                </h2>
                {appointments.length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center', padding: '2rem 0' }}>No appointments found in database.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {appointments.map(app => (
                            <div key={app.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>{app.caseType}</h4>
                                <div style={{ fontSize: '0.875rem', color: '#888', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <span><strong>Advocate:</strong> {app.lawyer}</span>
                                    <span><strong>Date:</strong> {app.date}</span>
                                    <span><strong>Status:</strong> <span style={{ color: 'var(--success-color)' }}>{app.status}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
