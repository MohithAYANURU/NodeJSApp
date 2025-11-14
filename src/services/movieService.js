import Movie from '../models/Movie.js'
export const getAllMovies = () => Movie.findAll()
export const getMovieById = id => Movie.findById(id)
export const createMovie = data => Movie.create(data)
export const updateMovie = (id, data) => Movie.update(id, data)
export const deleteMovie = id => Movie.delete(id)
