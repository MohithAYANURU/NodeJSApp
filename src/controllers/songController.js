import * as songService from '../services/songService.js'

export const getAllSongs = (req, res) => res.json(songService.getAllSongs())
export const getSongById = (req, res) => {
	const song = songService.getSongById(req.params.id)
	song ? res.json(song) : res.status(404).json({ message: 'Song not found' })
}
export const createSong = (req, res) => {
	const { title, artist } = req.body
	if (!title || !artist) return res.status(400).json({ message: 'Title and artist required' })
	res.status(201).json(songService.createSong(req.body))
}
export const updateSong = (req, res) => {
	const updated = songService.updateSong(req.params.id, req.body)
	updated ? res.json(updated) : res.status(404).json({ message: 'Song not found' })
}
export const deleteSong = (req, res) => {
	const deleted = songService.deleteSong(req.params.id)
	deleted ? res.status(204).send() : res.status(404).json({ message: 'Song not found' })
}
