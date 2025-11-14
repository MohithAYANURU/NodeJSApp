import express from 'express'
import * as c from '../controllers/bookController.js'
const router = express.Router()
router.get('/', c.getAllBooks)
router.get('/:id', c.getBookById)
router.post('/', c.createBook)
router.put('/:id', c.updateBook)
router.delete('/:id', c.deleteBook)
export default router
