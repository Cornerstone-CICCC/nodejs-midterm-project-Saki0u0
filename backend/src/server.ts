import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// Create server
const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SIGN_KEY))

// Routes

app.get('/deezer-proxy/:endpoint/:id?/:link?', async (req, res) => {
  const { endpoint, id , link } = req.params; 
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

    const response = await axios.get(deezerUrl, { params: query });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Deezer API');
    res.status(500).send('Error fetching Deezer API');
  }
});

import userRouter from './routes/user.routes'
app.use('/', userRouter)

import taskRouter from './routes/user.routes'
app.use('/', taskRouter)

//playList
const playlistFilePath = path.join(__dirname, 'playlist.json');

let playlist: { title: string, artist: string }[] = [];

fs.readFile(playlistFilePath, (err, data) => {
  if (err) {
    console.log('No previous playlist found, starting fresh');
  } else {
    playlist = JSON.parse(data.toString());
  }
});

app.get('/playlist', (req: Request, res: Response) => {
  res.json(playlist);
});

app.post('/playlist', (req: Request, res: Response) => {
  const { track } = req.body;
  if (track && track.title && track.artist) {
    playlist.push(track);
    
    fs.writeFile(playlistFilePath, JSON.stringify(playlist, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Failed to save playlist');
      }
      res.status(200).send('Track added to playlist');
    });
  } else {
    res.status(400).send('Track data is required');
  }
});


app.delete('/playlist', (req: Request, res: Response) => {
  const { title } = req.body;
  if (title) {
    playlist = playlist.filter(track => track.title !== title);
    fs.writeFile(playlistFilePath, JSON.stringify(playlist, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Failed to delete track');
      }
      res.status(200).send('Track removed from playlist');
    });
  } else {
    res.status(400).send('Track title is required');
  }
});


// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route')
})

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
