"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_model_1 = __importDefault(require("../models/track.model"));
const playlist_model_1 = __importDefault(require("../models/playlist.model"));
const getPlaylist = (req, res) => {
    const playlist = playlist_model_1.default.findAll();
    res.json(playlist);
};
// Get track by id
const getTrackById = (req, res) => {
    const { trackId } = req.params;
    const track = track_model_1.default.findTrackById(trackId);
    if (!track) {
        return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(track);
};
// Add track
const addPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tracks } = req.body;
    if (!name || !tracks || tracks.length === 0) {
        return res.status(400).json({ error: 'Invalid data: Name and tracks are required' });
    }
    const playlist = yield playlist_model_1.default.createPlaylist({
        name,
        tracks
    });
    res.status(201).json(playlist);
});
// Update track by id
const updatetrackById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const track = playlist_model_1.default.updatePlaylist(id, { name });
    if (!track) {
        res.status(404).json({ message: "track not found" });
        return;
    }
    res.status(200).json(track);
};
// Delete track by id
const deletetrackById = (req, res) => {
    const { id } = req.params;
    const isDeleted = playlist_model_1.default.deletePlaylist(id);
    if (!isDeleted) {
        res.status(404).send('track not found');
        return;
    }
    res.status(200).send('track deleted!');
};
// Check auth profile
const trackProfile = (req, res) => {
    res.status(200).send('You are allowed to view the page');
};
exports.default = {
    getPlaylist,
    getTrackById,
    addPlaylist,
    updatetrackById,
    deletetrackById,
    trackProfile
};
