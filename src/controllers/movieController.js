import * as movieService from '../services/movieService.js'

export const getAllMovies = (req, res) => res.json(movieService.getAllMovies())
export const getMovieById = (req, res) => {
	const movie = movieService.getMovieById(req.params.id)
	movie ? res.json(movie) : res.status(404).json({ message: 'Movie not found' })
}
export const createMovie = (req, res) => {
	const { title, director } = req.body
	if (!title || !director) return res.status(400).json({ message: 'Title and director required' })
	res.status(201).json(movieService.createMovie(req.body))
}
export const updateMovie = (req, res) => {
	const updated = movieService.updateMovie(req.params.id, req.body)
	updated ? res.json(updated) : res.status(404).json({ message: 'Movie not found' })
}
export const deleteMovie = (req, res) => {
	const deleted = movieService.deleteMovie(req.params.id)
	deleted ? res.status(204).send() : res.status(404).json({ message: 'Movie not found' })
}
