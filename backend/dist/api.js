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
Object.defineProperty(exports, "__esModule", { value: true });
const refreshToken_1 = require("./auth/refreshToken");
const spotifyApi_1 = require("./services/spotifyApi");
const refreshToken = 'your_stored_refresh_token';
const artistId = 'some_artist_id';
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield (0, refreshToken_1.refreshAccessToken)(refreshToken);
        console.log('Access Token:', accessToken);
        const artistInfo = yield (0, spotifyApi_1.getArtistInfo)(accessToken, artistId);
        console.log('Artist Info:', artistInfo);
    }
    catch (error) {
        console.error(error);
    }
});
run();
