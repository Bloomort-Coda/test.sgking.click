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
          { theme: 'outline', size: 'large', text: 'signin_with' }
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

  return <div ref={googleButtonRef}></div>;
};

export default GoogleLogin;
