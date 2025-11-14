import Book from '../models/Book.js'
export const getAllBooks = () => Book.findAll()
export const getBookById = id => Book.findById(id)
export const createBook = data => Book.create(data)
export const updateBook = (id, data) => Book.update(id, data)
export const deleteBook = id => Book.delete(id)
