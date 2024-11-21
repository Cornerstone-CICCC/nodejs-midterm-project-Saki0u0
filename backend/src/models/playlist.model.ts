import { Playlist } from "../types/playlist"
import { v4 as uuidv4 } from 'uuid'
import { Track } from "../types/track"

class PlaylistModel {
  private playlists: Playlist[] = [];

  // Get all playlists
  findAll(): Playlist[] {
    return this.playlists;
  }

  // Get a playlist by its ID
  getPlaylistById(id: string): Playlist | undefined {
    return this.playlists.find((playlist) => playlist.id === id);
  }

  // Create a new playlist
  createPlaylist(data: { name: string ,tracks: Track[]}):Playlist {
    const playlist: Playlist = { id: uuidv4(), name: data.name, tracks:data.tracks };
    this.playlists.push(playlist);
    return playlist;
  }

  // Update a playlist by ID
  updatePlaylist(id: string, updates: Partial<Playlist>): Playlist | undefined {
    const playlist = this.getPlaylistById(id);
    if (playlist) {
      Object.assign(playlist, updates);
      return playlist;
    }
    return undefined;
  }

  // Delete a playlist
  deletePlaylist(id: string): boolean {
    const index = this.playlists.findIndex((playlist) => playlist.id === id);
    if (index !== -1) {
      this.playlists.splice(index, 1);
      return true;
    }
    return false;
  }

  // Add track to a playlist
  addTrackToPlaylist(playlistId: string, track: Track): Playlist | null {
    const playlist = this.getPlaylistById(playlistId);
    if (!playlist) return null;
    playlist.tracks.push(track);
    return playlist;
  }

  // Get all playlists
  getPlaylists(): Playlist[] {
    return this.playlists;
  }
}

export default new PlaylistModel();