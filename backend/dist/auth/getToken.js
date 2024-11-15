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
exports.getTokens = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const clientId = '4ecce5e45a7d41999869504ea36ed040';
const clientSecret = 'e2b50d7200ed48969332ed8741339ad7';
const redirectUri = 'http://localhost:3000/callback';
const getTokens = (authorizationCode) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirectUri,
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to get tokens: ${response.statusText}`);
    }
    const data = yield response.json();
    return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
    };
});
exports.getTokens = getTokens;
