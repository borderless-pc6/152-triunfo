import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@example.com' && password === '123456') {
            setError('');
            alert('Login realizado com sucesso!');
        } else {
            setError('E-mail ou senha inválidos.');
        }
    };

    return (
        <div className='l-loginPage' style={{}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input className='l-input'
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input className='l-input'
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                <button className='l-button' type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;