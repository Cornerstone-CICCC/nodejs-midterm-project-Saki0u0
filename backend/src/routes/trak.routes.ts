import { Router, Request, Response } from 'express'
import trackController from '../controllers/track.controller'
import { cookieAuthCheck } from '../middleware/auth'

const trackRouter = Router()

trackRouter.get('/', trackController.getPlaylist)
// trackRouter .post('/', trackController.addPlaylist)
trackRouter .get('/auth', cookieAuthCheck, trackController.trackProfile)
// trackRouter .get('/:playlistId/tracks/:trackId', trackController.getTrackById)
trackRouter.put('/:id', trackController.updatetrackById)
trackRouter.delete('/:id',trackController.deletetrackById)

export default trackRouter