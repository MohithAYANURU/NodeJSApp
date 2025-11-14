import Event from '../models/Event.js'

export const getAllEvents = () => Event.findAll()
export const getEventById = id => Event.findById(id)
export const createEvent = data => Event.create(data)
export const updateEvent = (id, data) => Event.update(id, data)
export const deleteEvent = id => Event.delete(id)
