import { Request, Response } from 'express'
import trackModel from '../models/track.model'
import playlistModel from '../models/playlist.model'
import { Track } from '../types/track'
import { Playlist } from '../types/playlist'
import { v4 as uuidv4 } from 'uuid';


const getPlaylist = (req: Request, res: Response) => {
  const playlist = playlistModel.findAll()
  res.json(playlist)
}

// Get track by id
const getTrackById = (req: Request<{ playlistId: string; trackId: string }>, res: Response) => {
  const { trackId } = req.params;

  const track = trackModel.findTrackById(trackId);

  if (!track) {
    return res.status(404).json({ error: 'Track not found' });
  }

  res.status(200).json(track);
};


// Add track
const addPlaylist = async (req: Request<{}, {}, { name: string, tracks: Track[] }>, res: Response) => {
  const { name, tracks } = req.body;

  if (!name || !tracks || tracks.length === 0) {
    return res.status(400).json({ error: 'Invalid data: Name and tracks are required' });
  }
    const playlist = await playlistModel.createPlaylist({
      name,
      tracks
    });

  res.status(201).json(playlist);
};
 

// Update track by id
const updatetrackById = (req: Request<{ id: string }, {}, Playlist>, res: Response) => {
  const { id } = req.params
  const { name  } = req.body
  const track = playlistModel.updatePlaylist(id, { name })
  if (!track) {
    res.status(404).json({ message: "track not found" })
    return
  }
  res.status(200).json(track)
}

// Delete track by id
const deletetrackById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const isDeleted = playlistModel.deletePlaylist(id)
  if (!isDeleted) {
    res.status(404).send('track not found')
    return
  }
  res.status(200).send('track deleted!')
}

// Check auth profile
const trackProfile = (req: Request, res: Response) => {
  res.status(200).send('You are allowed to view the page')
}


export default {
  getPlaylist,
  getTrackById,
  addPlaylist,
  updatetrackById,
  deletetrackById,
  trackProfile
}