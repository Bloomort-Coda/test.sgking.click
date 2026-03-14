import React, { useEffect, useRef } from 'react';

interface GoogleLoginProps {
  onSuccess: (user: any) => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess, onError }) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId || clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      console.error('Google Client ID not configured');
      return;
    }

    const handleCredentialResponse = async (response: any) => {
      try {
        const res = await fetch('/api/auth.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_token: response.credential }),
        });

        const data = await res.json();
        if (data.success) {
          onSuccess(data.user);
        } else {
          onError(data.error || 'Login failed');
        }
      } catch (err) {
        onError('Failed to connect to authentication server');
        console.error(err);
      }
    };

    const initializeGoogle = () => {
      if (window.google && clientId) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          { 
            theme: 'filled_blue', 
            size: 'large', 
            type: 'icon', 
            shape: 'circle' 
          }
        );
      }
    };

    // Try to initialize immediately
    if (window.google) {
      initializeGoogle();
    } else {
      // If not loaded yet, check every 500ms for up to 5 seconds
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.google) {
          initializeGoogle();
          clearInterval(interval);
        } else if (attempts > 10) {
          clearInterval(interval);
          console.error('Google Identity Services script failed to load');
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [onSuccess, onError]);

  return (
    <div className="group relative flex items-center justify-center w-10 h-10 hover:scale-105 transition-transform">
      <div ref={googleButtonRef}></div>
      <div className="absolute top-full mt-2 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-medium uppercase tracking-wider rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-white/10 translate-y-1 group-hover:translate-y-0">
        Log in with Google
      </div>
    </div>
  );
};

export default GoogleLogin;
