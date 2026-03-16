import React, { useEffect, useState } from 'react'
import EventAPI from '../services/EventAPI'
import LocationAPI from '../services/LocationAPI'
import Event from '../components/Event'
import '../css/Events.css'

const buildLocationLabel = (location) => `${location.name} - ${location.city}, ${location.state}`

const buildLocationKey = (item) => `${item.address}|${item.city}|${item.state}|${item.zip}`

const sortEvents = (events, locations, sortBy) => {
	const locationNameByKey = new Map(
		locations.map((location) => [buildLocationKey(location), location.name])
	)

	const sortedEvents = [...events]

	sortedEvents.sort((left, right) => {
		if (sortBy === 'latest') {
			return new Date(right.start_at) - new Date(left.start_at)
		}

		if (sortBy === 'title') {
			return left.title.localeCompare(right.title)
		}

		if (sortBy === 'location') {
			const leftLocation = locationNameByKey.get(buildLocationKey(left)) || ''
			const rightLocation = locationNameByKey.get(buildLocationKey(right)) || ''
			return leftLocation.localeCompare(rightLocation) || new Date(left.start_at) - new Date(right.start_at)
		}

		return new Date(left.start_at) - new Date(right.start_at)
	})

	return sortedEvents
}

const Events = () => {
	const [events, setEvents] = useState([])
	const [locations, setLocations] = useState([])
	const [selectedLocation, setSelectedLocation] = useState('all')
	const [sortBy, setSortBy] = useState('soonest')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadPageData = async () => {
			try {
				const [eventsData, locationsData] = await Promise.all([
					EventAPI.getAllEvents(),
					LocationAPI.getAllLocations()
				])

				setEvents(eventsData)
				setLocations(locationsData)
			}
			catch (error) {
				throw error
			}
			finally {
				setIsLoading(false)
			}
		}

		loadPageData()
	}, [])

	const filteredEvents = events.filter((event) => {
		if (selectedLocation === 'all') {
			return true
		}

		return buildLocationKey(event) === selectedLocation
	})

	const visibleEvents = sortEvents(filteredEvents, locations, sortBy)

	return (
		<section className='events-page'>
			<div className='events-toolbar'>
				<div className='events-toolbar-copy'>
					<h2>All Events</h2>
					<p>Browse every upcoming event, then narrow the list by venue or sort order.</p>
				</div>

				<div className='events-controls'>
					<label className='events-control'>
						<span>Filter by location</span>
						<select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
							<option value='all'>All locations</option>
							{locations.map((location) => (
								<option key={location.id} value={buildLocationKey(location)}>
									{buildLocationLabel(location)}
								</option>
							))}
						</select>
					</label>

					<label className='events-control'>
						<span>Sort events</span>
						<select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
							<option value='soonest'>Soonest first</option>
							<option value='latest'>Latest first</option>
							<option value='title'>Title</option>
							<option value='location'>Location</option>
						</select>
					</label>
				</div>
			</div>

			{isLoading ? (
				<p className='events-status'>Loading events...</p>
			) : visibleEvents.length > 0 ? (
				<div className='events-grid'>
					{visibleEvents.map((event) => (
						<Event
							key={event.id}
							id={event.id}
							title={event.title}
							start_at={event.start_at}
							image={event.image}
						/>
					))}
				</div>
			) : (
				<p className='events-status'>No events match the current filter.</p>
			)}
		</section>
	)
}

export default Events
