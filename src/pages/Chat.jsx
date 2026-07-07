import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('candy_chat_history');
        if (saved) {
            setMessages(JSON.parse(saved));
        } else {
            setMessages([{ id: 1, text: 'Hello! I am Candy (CAN Defend You). How can I assist you in understanding the law today?', sender: 'bot' }]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('candy_chat_history', JSON.stringify(messages));
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const askGemini = async (prompt) => {
        if (!GEMINI_API_KEY) {
            throw new Error('Gemini API key is not configured.');
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{
                            text: `You are Candy, a friendly legal information assistant for CANdy. Answer clearly, briefly, and safely. Mention that this is general information and advise consulting a qualified advocate for serious or personalized legal matters.\n\nUser question: ${prompt}`,
                        }],
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData?.error?.message || 'Unable to reach Gemini right now.');
        }

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I am not sure how to answer that right now. Please try again.';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        const newMsg = { id: Date.now(), text: trimmedInput, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const answer = await askGemini(trimmedInput);
            const botResponse = {
                id: Date.now() + 1,
                text: answer,
                sender: 'bot',
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            const fallback = {
                id: Date.now() + 1,
                text: error.message || 'I was unable to respond right now. Please try again shortly.',
                sender: 'bot',
            };
            setMessages(prev => [...prev, fallback]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        const defaultMsg = [{ id: 1, text: 'Hello! I am Candy (CAN Defend You). How can I assist you in understanding the law today?', sender: 'bot' }];
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
                {isLoading && (
                    <div className="message bot" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, opacity: 0.7 }}><Bot size={20} /></div>
                        <div>Thinking...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ask your legal question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!input.trim() || isLoading}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
