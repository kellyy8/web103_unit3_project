import express from 'express'
import {
    getAllEvents,
    getEventsByLocation,
    getEventById
} from '../controllers/eventController.js'

const router = express.Router()

router.get('/', getAllEvents)
router.get('/by-location', getEventsByLocation)
router.get('/:id', getEventById)

export default router