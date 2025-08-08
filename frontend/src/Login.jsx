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
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Connexion</h2>

        <input
          type="email"
          placeholder="Email"
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
  container: {
    backgroundColor: '#bde0fe',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#0077b6',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#bde0fe',
    color: 'black',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Login;
