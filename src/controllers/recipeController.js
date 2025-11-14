import * as recipeService from '../services/recipeService.js'

export const getAllRecipes = (req, res) => {
  try { res.json(recipeService.getAllRecipes()) }
  catch (e) { res.status(500).json({ message: e.message }) }
}

export const getRecipeById = (req, res) => {
  try {
    const r = recipeService.getRecipeById(req.params.id)
    if (!r) return res.status(404).json({ message: 'Recipe not found' })
    res.json(r)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const createRecipe = (req, res) => {
  try {
    const { title } = req.body
    if (!title) return res.status(400).json({ message: 'Title required' })
    const r = recipeService.createRecipe(req.body)
    res.status(201).json(r)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const updateRecipe = (req, res) => {
  try {
    const r = recipeService.updateRecipe(req.params.id, req.body)
    if (!r) return res.status(404).json({ message: 'Recipe not found' })
    res.json(r)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const deleteRecipe = (req, res) => {
  try {
    if (!recipeService.deleteRecipe(req.params.id)) return res.status(404).json({ message: 'Recipe not found' })
    res.status(204).send()
  } catch (e) { res.status(500).json({ message: e.message }) }
}
