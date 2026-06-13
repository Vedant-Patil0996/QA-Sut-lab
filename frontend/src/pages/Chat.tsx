import { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);

  const handleSend = async () => {
    if (!prompt) return;
    
    setMessages([...messages, { role: 'user', content: prompt }]);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: currentPrompt }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (e) {
      console.error('Chat error', e);
    }
  };

  return (
    <div>
      <h2>AI Assistant</h2>
      <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
        <div data-testid="chat-messages" style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ padding: '0.5rem', background: m.role === 'user' ? '#e2e8f0' : '#f8fafc', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <strong>{m.role}: </strong> {m.content}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="input"
            style={{ marginBottom: 0 }}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            data-testid="chat-input"
            placeholder="Type a message..."
          />
          <button className="button" onClick={handleSend} data-testid="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}
