import express from 'express'
import * as c from '../controllers/movieController.js'
const router = express.Router()
router.get('/', c.getAllMovies)
router.get('/:id', c.getMovieById)
router.post('/', c.createMovie)
router.put('/:id', c.updateMovie)
router.delete('/:id', c.deleteMovie)
export default router
