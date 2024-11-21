"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class PlaylistModel {
    constructor() {
        this.playlists = [];
    }
    // Get all playlists
    findAll() {
        return this.playlists;
    }
    // Get a playlist by its ID
    getPlaylistById(id) {
        return this.playlists.find((playlist) => playlist.id === id);
    }
    // Create a new playlist
    createPlaylist(data) {
        const playlist = { id: (0, uuid_1.v4)(), name: data.name, tracks: data.tracks };
        this.playlists.push(playlist);
        return playlist;
    }
    // Update a playlist by ID
    updatePlaylist(id, updates) {
        const playlist = this.getPlaylistById(id);
        if (playlist) {
            Object.assign(playlist, updates);
            return playlist;
        }
        return undefined;
    }
    // Delete a playlist
    deletePlaylist(id) {
        const index = this.playlists.findIndex((playlist) => playlist.id === id);
        if (index !== -1) {
            this.playlists.splice(index, 1);
            return true;
        }
        return false;
    }
    // Add track to a playlist
    addTrackToPlaylist(playlistId, track) {
        const playlist = this.getPlaylistById(playlistId);
        if (!playlist)
            return null;
        playlist.tracks.push(track);
        return playlist;
    }
    // Get all playlists
    getPlaylists() {
        return this.playlists;
    }
}
exports.default = new PlaylistModel();
