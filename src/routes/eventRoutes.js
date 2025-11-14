import express from 'express'
import * as c from '../controllers/eventController.js'
const router = express.Router()

router.get('/', c.getAllEvents)
router.get('/:id', c.getEventById)
router.post('/', c.createEvent)
router.put('/:id', c.updateEvent)
router.delete('/:id', c.deleteEvent)

export default router
