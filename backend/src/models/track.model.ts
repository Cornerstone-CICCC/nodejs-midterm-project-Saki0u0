import { v4 as uuidv4 } from 'uuid'
import { Playlist } from "../types/playlist"
import { Track } from "../types/track"


class TrackModel {
  private tracks: Track[] = [];

  // Get all tracks
  findAll(): Track[] {
    return this.tracks;
  }

  // Find a track by its ID
  findTrackById(trackId: string): Track | undefined {
    return this.tracks.find((track) => track.id === trackId);
  }

  // Create a new track
  createTrack(data: { title: string; artist: string }): Track {
    const track = { id: uuidv4(), ...data };
    this.tracks.push(track);
    return track;
  }
}

export default new TrackModel();

