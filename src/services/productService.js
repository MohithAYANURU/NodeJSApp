import Product from '../models/Product.js'

export const getAllProducts = () => Product.findAll()
export const getProductById = id => Product.findById(id)
export const createProduct = data => Product.create(data)
export const updateProduct = (id, data) => Product.update(id, data)
export const deleteProduct = id => Product.delete(id)
export const adjustProductStock = (id, delta) => Product.adjustStock(id, delta)
