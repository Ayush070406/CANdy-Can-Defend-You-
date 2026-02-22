import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Load from local DB simulation
    useEffect(() => {
        const saved = localStorage.getItem('candy_chat_history');
        if (saved) {
            setMessages(JSON.parse(saved));
        } else {
            setMessages([{ id: 1, text: "Hello! I am Candy (CAN Defend You). How can I assist you in understanding the law today?", sender: 'bot' }]);
        }
    }, []);

    // Save to DB when messages change
    useEffect(() => {
        localStorage.setItem('candy_chat_history', JSON.stringify(messages));
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate Bot typing response
        setTimeout(() => {
            const botResponses = [
                "According to the constitutional framework, your fundamental rights are protected. I can help clarify specific sections if you provide more details.",
                "That's an excellent legal query. While I am an AI, I suggest you also consider consulting an advocate through our booking system for comprehensive legal advice.",
                "Under current law, there are specific guidelines that regulate this scenario. Can you be more specific?",
                "Remember, law is about interpretation. Based on precedents, your rights include right to life and liberty.",
                "Your query involves civil liberties. Are you looking to file a consumer complaint or a regular civil suit?"
            ];
            const botResponse = {
                id: Date.now() + 1,
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1200);
    };

    const handleClear = () => {
        const defaultMsg = [{ id: 1, text: "Hello! I am Candy (CAN Defend You). How can I assist you in understanding the law today?", sender: 'bot' }];
        setMessages(defaultMsg);
        localStorage.setItem('candy_chat_history', JSON.stringify(defaultMsg));
    };

    return (
        <div className="animate-fade-in glass-panel chat-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bot size={24} /> Chat with Candy</h2>
                <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={handleClear}>Clear Chat</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, opacity: 0.7 }}>
                            {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
                        </div>
                        <div>{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ask your legal question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
