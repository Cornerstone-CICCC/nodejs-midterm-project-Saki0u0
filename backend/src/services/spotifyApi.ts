export const getArtistInfo = async (accessToken: string, artistId: string): Promise<any> => {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch artist info: ${response.statusText}`);
  }

  return await response.json();
};
