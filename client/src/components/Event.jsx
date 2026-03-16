import React, { useState, useEffect } from 'react'
import dates from '../services/DateUtils'
import '../css/Event.css'

const Event = (props) => {

    // const [props, setEvent] = useState([])
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const eventData = await EventsAPI.getEventById(props.id)
    //             setEvent(eventData)
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [])

    useEffect(() => {
        if (!props.start_at) {
            return
        }
        const result = dates.formatTime(props.start_at)
        setTime(result)
    }, [props.start_at])

    useEffect(() => {
        if (!props.start_at) {
            return
        }
        const timeRemaining = dates.formatRemainingTime(props.start_at)
        setRemaining(timeRemaining)
        dates.formatNegativeTimeRemaining(timeRemaining, props.id)
    }, [props.id, props.start_at])

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {dates.formatDate(props.start_at)} <br /> {time}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event