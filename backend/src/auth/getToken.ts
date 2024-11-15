import fetch from 'node-fetch';

const clientId: string = '4ecce5e45a7d41999869504ea36ed040';
const clientSecret: string = 'e2b50d7200ed48969332ed8741339ad7';
const redirectUri: string = 'http://localhost:3000/callback';

export const getTokens = async (authorizationCode: string): Promise<{ access_token: string; refresh_token: string }> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get tokens: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
};
