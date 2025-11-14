import express from 'express'
import * as c from '../controllers/recipeController.js'
const router = express.Router()

router.get('/', c.getAllRecipes)
router.get('/:id', c.getRecipeById)
router.post('/', c.createRecipe)
router.put('/:id', c.updateRecipe)
router.delete('/:id', c.deleteRecipe)

export default router
