import fetch from 'node-fetch';

const clientId: string = '4ecce5e45a7d41999869504ea36ed040';
const clientSecret: string = 'e2b50d7200ed48969332ed8741339ad7';

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};
