const API_BASE_URL = '/api'

const getAllLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`, { method: 'GET' })
        if(!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.status}`)
        }
        return response.json()
    }
    catch (error) {
        console.log(error)
        return []
    }
}

const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`, { method: 'GET' })
        if(!response.ok) {
            throw new Error(`Failed to fetch single location (id:${id}) ${response.status}`)
        }
        return response.json()
    }
    catch (error) {
        console.log(error)
        return {}
    }
}

const LocationAPI = {
    getAllLocations,
    getLocationById
}

export default LocationAPI