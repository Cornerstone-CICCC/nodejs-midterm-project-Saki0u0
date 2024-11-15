import { refreshAccessToken } from './auth/refreshToken';
import { getArtistInfo } from './services/spotifyApi';

const refreshToken = 'your_stored_refresh_token';
const artistId = 'some_artist_id';

const run = async () => {
  try {
    const accessToken = await refreshAccessToken(refreshToken);
    console.log('Access Token:', accessToken);

    const artistInfo = await getArtistInfo(accessToken, artistId);
    console.log('Artist Info:', artistInfo);
  } catch (error) {
    console.error(error);
  }
};

run();

