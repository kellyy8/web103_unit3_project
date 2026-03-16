import pool from '../config/database.js'

// GET /events - return all events
export const getAllEvents = async (_, res) => {
    try {
        const query = 'SELECT * FROM events ORDER BY start_at DESC'
        const result = await pool.query(query)
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No events found.' })
        }
        return res.status(200).json(result.rows)
    }
    catch (error) {
        console.log('Error fetching all events:', error)
        res.status(500).json({ error: error })
    }
}

// GET /events/by-location - return all events at specified location
export const getEventsByLocation = async (req, res) => {
    try {
        const { address, city, state, zip } = req.query
        if (!address || !city || !state || !zip) {
            return res.status(400).json({ error: 'Missing location information.' })
        }

        const query = 'SELECT * FROM events WHERE address = $1 AND city = $2 AND state = $3 AND zip = $4'
        const result = await pool.query(query, [address, city, state, zip])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No events at this location.' })
        }
        
        return res.status(200).json(result.rows)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

// GET /events/:id - return single event with specified id
export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id
        const query = 'SELECT * FROM events WHERE id = $1'
        const result = await pool.query(query, [eventId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Event with id ${eventId} not found.` })
        }
        return res.status(200).json(result.rows[0])
    }
    catch (error) {
        console.log(`Error fetching event with id ${req.params.id}.`, error)
        res.status(500).json({ error: error })
    }
}