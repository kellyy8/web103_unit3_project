const formatDate = (startAt) => {
    if (!startAt) {
        return ''
    }
    return new Date(startAt).toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
}

const formatTime = (startAt) => {
    if (!startAt){
        return ''
    }
    return new Date(startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatRemainingTime = (startAt) => {
    if (!startAt) {
        return ''
    }
    const ms = new Date(startAt).getTime() - Date.now()
    if (ms <= 0) {
        return 'Event has ended!'
    }
    const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24))
    const months = Math.floor(totalDays / 30)
    const days = totalDays % 30
    if (months >= 1) {
        return `${months}mo ${days}d remaining`
    }
    return `${totalDays}d remaining`
}

const formatNegativeTimeRemaining = (remaining, id) => {
    if (remaining === 'Event has ended!') {
        const element = document.getElementById(`remaining-${id}`)
        if (element) {
            element.style.color = 'red'
            element.style.backgroundColor = 'pink'
        }
    }
}

const dates = { formatDate, formatTime, formatRemainingTime, formatNegativeTimeRemaining }

export default dates