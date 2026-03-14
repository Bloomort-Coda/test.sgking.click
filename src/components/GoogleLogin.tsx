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

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: 'outline', size: 'large', text: 'signin_with' }
      );
    }
  }, [onSuccess, onError]);

  return <div ref={googleButtonRef}></div>;
};

export default GoogleLogin;
