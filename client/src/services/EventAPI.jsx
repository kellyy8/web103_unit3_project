const API_BASE_URL = '/api'

const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`, { method: 'GET' })
        if(!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`)
        }
        return response.json()
    }
    catch (error) {
        console.log(error)
        return []
    }
}

const getEventsByLocation = async (params) => {
    try {
        const { name, ...remainingParams } = params
        const searchParams = new URLSearchParams(remainingParams)
        const queryString = searchParams.toString()
        const response = await fetch(`${API_BASE_URL}/events/by-location?${queryString}`, { method: 'GET' })
        if(!response.ok) {
            throw new Error(`Failed to fetch events at ${name}: ${response.status}`)
        }
        return response.json()
    }
    catch (error) {
        console.log(error)
        return []
    }
}

const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'GET' })
        if(!response.ok) {
            throw new Error(`Failed to fetch single event (id: ${id}): ${response.status}`)
        }
        return response.json()
    }
    catch (error) {
        console.log(error)
        return {}
    }
}

const EventAPI = {
    getAllEvents,
    getEventsByLocation,
    getEventById
}

export default EventAPI