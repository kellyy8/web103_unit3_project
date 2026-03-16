import pool from '../config/database.js'

// GET /locations - return all locations
export const getAllLocations = async (_, res) => {
    try {
        const query = 'SELECT * FROM locations'
        const result = await pool.query(query)
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No locations found.' })
        }
        return res.status(200).json(result.rows)
    }
    catch (error) {
        console.log('Error fetching all locations:', error)
        res.status(500).json({ error: error })
    }
}

// GET /locations/:id - return single location with specified id
export const getLocationById = async (req, res) => {
    try {
        const locationId = req.params.id
        const query = 'SELECT * FROM locations WHERE id = $1'
        const result = await pool.query(query, [locationId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Location with id ${locationId} not found.` })
        }
        return res.status(200).json(result.rows[0])
    }
    catch (error) {
        console.log(`Error fetching location with id ${req.params.id}.`, error)
        res.status(500).json({ error: error })
    }
}