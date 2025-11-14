import express from 'express'
import * as c from '../controllers/songController.js'
const router = express.Router()
router.get('/', c.getAllSongs)
router.get('/:id', c.getSongById)
router.post('/', c.createSong)
router.put('/:id', c.updateSong)
router.delete('/:id', c.deleteSong)
export default router
