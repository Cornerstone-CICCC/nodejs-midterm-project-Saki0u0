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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SIGN_KEY));
// Routes
app.get('/deezer-proxy/:endpoint/:id?/:link?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, id, link } = req.params;
    const query = req.query;
    try {
        let deezerUrl = `https://api.deezer.com/${endpoint}`;
        if (id) {
            deezerUrl += `/${id}`;
        }
        if (link) {
            deezerUrl += `/${link}`;
        }
        console.log('Deezer API URL:', deezerUrl);
        console.log('Query Parameters:', query);
        console.log(deezerUrl);
        const response = yield axios_1.default.get(deezerUrl, { params: query });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error fetching Deezer API');
        res.status(500).send('Error fetching Deezer API');
    }
}));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use('/', user_routes_1.default);
const user_routes_2 = __importDefault(require("./routes/user.routes"));
app.use('/', user_routes_2.default);
//playList
const playlistFilePath = path_1.default.join(__dirname, 'playlist.json');
let playlist = [];
fs_1.default.readFile(playlistFilePath, (err, data) => {
    if (err) {
        console.log('No previous playlist found, starting fresh');
    }
    else {
        playlist = JSON.parse(data.toString());
    }
});
app.get('/playlist', (req, res) => {
    res.json(playlist);
});
app.post('/playlist', (req, res) => {
    const { track } = req.body;
    if (track && track.title && track.artist) {
        playlist.push(track);
        fs_1.default.writeFile(playlistFilePath, JSON.stringify(playlist, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Failed to save playlist');
            }
            res.status(200).send('Track added to playlist');
        });
    }
    else {
        res.status(400).send('Track data is required');
    }
});
app.delete('/playlist', (req, res) => {
    const { title } = req.body;
    if (title) {
        playlist = playlist.filter(track => track.title !== title);
        fs_1.default.writeFile(playlistFilePath, JSON.stringify(playlist, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Failed to delete track');
            }
            res.status(200).send('Track removed from playlist');
        });
    }
    else {
        res.status(400).send('Track title is required');
    }
});
// 404 Fallback
app.use((req, res) => {
    res.status(404).send('Invalid route');
});
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
