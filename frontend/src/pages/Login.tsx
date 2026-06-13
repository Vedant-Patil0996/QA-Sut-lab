import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ width: '400px' }}>
        <h2>Sign in</h2>
        {error && <div className="error-banner" data-testid="login-error">{error}</div>}
        <form onSubmit={handleLogin} data-testid="login-form">
          <input 
            className="input" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            data-testid="email-input" 
          />
          <input 
            className="input" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            data-testid="password-input" 
          />
          <button className="button" type="submit" data-testid="sign-in-button" style={{ width: '100%' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
