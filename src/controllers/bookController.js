import * as bookService from '../services/bookService.js'

export const getAllBooks = (req, res) => res.json(bookService.getAllBooks())
export const getBookById = (req, res) => {
	const book = bookService.getBookById(req.params.id)
	book ? res.json(book) : res.status(404).json({ message: 'Book not found' })
}
export const createBook = (req, res) => {
	const { title, author } = req.body
	if (!title || !author) return res.status(400).json({ message: 'Title and author required' })
	res.status(201).json(bookService.createBook(req.body))
}
export const updateBook = (req, res) => {
	const updated = bookService.updateBook(req.params.id, req.body)
	updated ? res.json(updated) : res.status(404).json({ message: 'Book not found' })
}
export const deleteBook = (req, res) => {
	const deleted = bookService.deleteBook(req.params.id)
	deleted ? res.status(204).send() : res.status(404).json({ message: 'Book not found' })
}
