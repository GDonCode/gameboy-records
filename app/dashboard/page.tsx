// app/dashboard/page.tsx
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/dashboard/login');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      background: 'linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #10160f 100%)',
      color: '#fff',
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      <h1 style={{
        fontFamily: "'Hemisphers Bold Sans', monospace",
        fontSize: '2em',
        letterSpacing: '0.1em',
        color: '#4dff91',
      }}>
        WELCOME, {session.user?.name?.toUpperCase()}
      </h1>

      <form action={async () => {
        'use server';
        await signOut({ redirectTo: '/dashboard/login' });
      }}>
        <button
          type="submit"
          style={{
            fontFamily: "'Hemisphers Bold Sans', monospace",
            fontSize: '0.85em',
            letterSpacing: '0.14em',
            color: '#fff',
            background: 'rgba(255,107,107,0.15)',
            border: '1px solid rgba(255,107,107,0.4)',
            padding: '10px 22px',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          SIGN OUT
        </button>
      </form>
    </div>
  );
}