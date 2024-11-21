"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class TrackModel {
    constructor() {
        this.tracks = [];
    }
    // Get all tracks
    findAll() {
        return this.tracks;
    }
    // Find a track by its ID
    findTrackById(trackId) {
        return this.tracks.find((track) => track.id === trackId);
    }
    // Create a new track
    createTrack(data) {
        const track = Object.assign({ id: (0, uuid_1.v4)() }, data);
        this.tracks.push(track);
        return track;
    }
}
exports.default = new TrackModel();
