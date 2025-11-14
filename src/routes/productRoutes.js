import express from 'express'
import * as c from '../controllers/productController.js'
const router = express.Router()

router.get('/', c.getAllProducts)
router.get('/:id', c.getProductById)
router.post('/', c.createProduct)
router.put('/:id', c.updateProduct)
router.delete('/:id', c.deleteProduct)

// adjust stock endpoint
router.post('/:id/stock', c.adjustStock)

export default router
