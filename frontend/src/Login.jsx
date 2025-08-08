import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        mot_de_passe: motDePasse,
      });

      localStorage.setItem('token', res.data.token);
      setMessage('✅ Connexion réussie !');
    } catch (err) {
      setMessage('❌ Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Bienvenue 👋</h2>
        <p style={styles.subtitle}>Connecte-toi à ton espace</p>

        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Se connecter</button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#bde0fe',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    transition: '0.3s ease-in-out',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#023e8a',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '25px',
    textAlign: 'center',
  },
  input: {
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: '0.2s',
  },
  button: {
    backgroundColor: '#bde0fe',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#555',
    fontWeight: 'bold',
  },
};

export default Login;
