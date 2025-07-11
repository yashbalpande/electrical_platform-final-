// @ts-nocheck
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Sign in feature coming soon!");
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #888' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #888' }}
        />
        <button type="submit" style={{ padding: 10, borderRadius: 4, background: '#646cff', color: '#fff', border: 'none', fontWeight: 600 }}>Sign In</button>
      </form>
      {message && <div style={{ marginTop: 16, color: '#0f0' }}>{message}</div>}
    </div>
  );
} 