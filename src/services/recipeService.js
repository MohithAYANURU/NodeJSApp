import Recipe from '../models/Recipe.js'

export const getAllRecipes = () => Recipe.findAll()
export const getRecipeById = id => Recipe.findById(id)
export const createRecipe = data => Recipe.create(data)
export const updateRecipe = (id, data) => Recipe.update(id, data)
export const deleteRecipe = id => Recipe.delete(id)
