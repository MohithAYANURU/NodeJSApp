import * as productService from '../services/productService.js'

export const getAllProducts = (req, res) => {
  try { res.status(200).json(productService.getAllProducts()) }
  catch (e) { res.status(500).json({ message: e.message }) }
}

export const getProductById = (req, res) => {
  try {
    const p = productService.getProductById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const createProduct = (req, res) => {
  try {
    const { name, price } = req.body
    if (!name || price === undefined) return res.status(400).json({ message: 'Name and price required' })
    const p = productService.createProduct(req.body)
    res.status(201).json(p)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const updateProduct = (req, res) => {
  try {
    const p = productService.updateProduct(req.params.id, req.body)
    if (!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const deleteProduct = (req, res) => {
  try {
    if (!productService.deleteProduct(req.params.id)) return res.status(404).json({ message: 'Product not found' })
    res.status(204).send()
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const adjustStock = (req, res) => {
  try {
    const delta = parseInt(req.body.delta, 10)
    if (Number.isNaN(delta)) return res.status(400).json({ message: 'delta must be integer' })
    const p = productService.adjustProductStock(req.params.id, delta)
    res.json(p)
  } catch (e) {
    if (e.message === 'Insufficient stock') return res.status(409).json({ message: e.message })
    res.status(500).json({ message: e.message })
  }
}
