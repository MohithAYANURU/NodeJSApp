import Song from '../models/Song.js'
export const getAllSongs = () => Song.findAll()
export const getSongById = id => Song.findById(id)
export const createSong = data => Song.create(data)
export const updateSong = (id, data) => Song.update(id, data)
export const deleteSong = id => Song.delete(id)
