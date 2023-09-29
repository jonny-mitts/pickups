const getUnits = (evt) => {
    const { correctedStart: date, diff } = evt
    const offset = 2
    const increments = 15
    const segmentIncrement = 3
    const segmentsPerHour = 4
    const hourSegments = segmentIncrement * segmentsPerHour
    const d = new Date(date)
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const minuteSegments = minutes / increments
    const totalOffset =
      hours * hourSegments + minuteSegments * segmentIncrement + offset
    const lengthOfEvent = (diff / increments) * segmentIncrement
    const styles = { gridRow: `${totalOffset} / span ${lengthOfEvent}` }

    return styles

    // return totalOffset;
}

export {getUnits}