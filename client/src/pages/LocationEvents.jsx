import React, { useState, useEffect } from 'react'
import EventAPI from '../services/EventAPI'
import LocationAPI from '../services/LocationAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const locationData = await LocationAPI.getLocationById(index)
                setLocation(locationData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [index])

    useEffect(() => {
        (async () => {
            try {
                const params = {
                    name: location.name,
                    address: location.address,
                    city: location.city,
                    state: location.state,
                    zip: location.zip
                }
                const eventsData = await EventAPI.getEventsByLocation(params)
                setEvents(eventsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [location])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            start_at={event.start_at}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents