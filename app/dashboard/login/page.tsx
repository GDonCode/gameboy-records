// app/dashboard/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (res?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <>
      <style>{`
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #10160f 100%);
        }
        .login-card {
          width: 380px;
          background: #0f1a12;
          border: 1px solid rgba(26,158,74,0.3);
          border-radius: 4px;
          padding: 40px 32px;
        }
        .login-title {
          font-family: 'Hemisphers Bold Sans', monospace;
          font-size: 1.6em;
          letter-spacing: 0.1em;
          color: #4dff91;
          text-align: center;
          margin-bottom: 28px;
          text-shadow: 0 0 20px rgba(77,255,145,0.25);
        }
        .login-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(26,158,74,0.25);
          color: #fff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9em;
          padding: 10px 14px;
          border-radius: 2px;
          width: 100%;
          outline: none;
          margin-bottom: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input:focus {
          border-color: #4dff91;
          box-shadow: 0 0 0 1px #4dff91, 0 0 12px rgba(77,255,145,0.15);
        }
        .login-submit {
          font-family: 'Hemisphers Bold Sans', monospace;
          font-size: 0.95em;
          letter-spacing: 0.16em;
          color: #fff;
          width: 100%;
          height: 48px;
          background: linear-gradient(175deg, #22b85a 0%, #178f42 100%);
          border: 1px solid #1a9e4a;
          border-bottom-color: #0d5c29;
          cursor: pointer;
          transition: transform 0.07s ease, background 0.08s ease;
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          background: linear-gradient(175deg, #2bd06a 0%, #1aa64c 100%);
        }
        .login-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .login-error {
          color: #ff6b6b;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.82em;
          margin-bottom: 14px;
          text-align: center;
        }
      `}</style>

      <div className="login-wrap">
        <div className="login-card">
          <div className="login-title">ARTIST LOGIN</div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" disabled={isSubmitting} className="login-submit">
              {isSubmitting ? 'SIGNING IN…' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}