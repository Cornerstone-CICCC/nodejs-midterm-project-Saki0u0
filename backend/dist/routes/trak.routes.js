"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const track_controller_1 = __importDefault(require("../controllers/track.controller"));
const auth_1 = require("../middleware/auth");
const trackRouter = (0, express_1.Router)();
trackRouter.get('/', track_controller_1.default.getPlaylist);
// trackRouter .post('/', trackController.addPlaylist)
trackRouter.get('/auth', auth_1.cookieAuthCheck, track_controller_1.default.trackProfile);
// trackRouter .get('/:playlistId/tracks/:trackId', trackController.getTrackById)
trackRouter.put('/:id', track_controller_1.default.updatetrackById);
trackRouter.delete('/:id', track_controller_1.default.deletetrackById);
exports.default = trackRouter;
