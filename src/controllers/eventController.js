import * as eventService from '../services/eventService.js'

export const getAllEvents = (req, res) => {
  try { res.json(eventService.getAllEvents()) }
  catch (e) { res.status(500).json({ message: e.message }) }
}

export const getEventById = (req, res) => {
  try {
    const ev = eventService.getEventById(req.params.id)
    if (!ev) return res.status(404).json({ message: 'Event not found' })
    res.json(ev)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const createEvent = (req, res) => {
  try {
    const { title, start_at } = req.body
    if (!title) return res.status(400).json({ message: 'Title required' })
    const ev = eventService.createEvent(req.body)
    res.status(201).json(ev)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const updateEvent = (req, res) => {
  try {
    const ev = eventService.updateEvent(req.params.id, req.body)
    if (!ev) return res.status(404).json({ message: 'Event not found' })
    res.json(ev)
  } catch (e) { res.status(500).json({ message: e.message }) }
}

export const deleteEvent = (req, res) => {
  try {
    if (!eventService.deleteEvent(req.params.id)) return res.status(404).json({ message: 'Event not found' })
    res.status(204).send()
  } catch (e) { res.status(500).json({ message: e.message }) }
}
