import { useRef } from 'react';

import { resetSelectedDay } from '@/utils/databaseUtils';
import DayCalendar from './DayCalendar';
import EventListView from './EventListView';

const DayView = (props) => {
  const {
    setTailwindEvents,
    tailwindEvents,
    currentDate,
    selectedDay = { },
    addEvent,
  } = props

  // const viewIs = "daycalendar";
  const viewIs = "eventlistview";
  
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const openDay = (day) => {
    setTailwindEvents(resetSelectedDay(tailwindEvents, day))
  }

  const localProps = {
    ...props,
    openDay
  }

  return (
    <>
      <div className="isolate flex flex-auto overflow-hidden bg-white">
      {viewIs === "daycalendar" && <DayCalendar {...localProps} />}
      {viewIs === "eventlistview" && <EventListView {...localProps} />}
      </div>
    </>
  )
}

export default DayView
