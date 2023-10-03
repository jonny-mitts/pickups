'use client';
import './style.css';

import React, { useState, useEffect } from 'react';
import Slideover from '@/components/tailwind/Slideover';
import { Container } from '../Container';
import TailwindCalendar from '../TailwindCalendar';
import { convertToTailwindCalData } from '@/utils/databaseUtils';
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.



const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  { name: 'Month View', href: '#', current: false, id: 'month'},
  { name: 'Day View', href: '#', current: true, id:'day' },
]


const PickupCalendar = ({ session, profile }) => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDay, setSelectedDay] = useState({})
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false)
  const [isSlideoverEdit, setIsSlideoverEdit] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isNewEvent, setIsNewEvent] = useState(true);
  const now = new Date()
  
  const [tailwindEvents, setTailwindEvents] = useState([]);

  // Set a minimum date to disable past dates
  const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  useEffect(() => {
    
  }, [selectedDay])
  

  useEffect(() => {
    setTailwindEvents(convertToTailwindCalData(events, currentDate));
  }, [events, currentDate])

  useEffect(() => {
    setSelectedDay(tailwindEvents.find((day) => day.isSelectedDay))
  },[tailwindEvents])
  
  
  const prepareData = (data) => {
    return data.map((item) => {
      return {
        id: item.id,
        location: item.location_id,
        title: decodeURIComponent(item.title).replace(/[!'()*]/g, unescape),
        start: new Date(item.start_time.split(' ').join('T')),
        end: new Date(item.end_time.split(' ').join('T')),
        description: decodeURIComponent(item.description).replace(
          /[!'()*]/g,
          unescape
        ),
        userId: item.user_id,
      };
    });
  }

  useEffect(() => {
    const getEventsData = async () => {
      const eventDataResponse = await fetch('/api/pickup')
      const { data } = await eventDataResponse.json()
      const preparedData = prepareData(data)
      setEvents(preparedData)
    }
    getEventsData()
  }, [])

  const addEvent = () => {
    if(!selectedDay){

    }
    setIsNewEvent(true);
    setIsSlideoverEdit(true)
    setIsSlideoverOpen(true)
  }

  const props = {tailwindEvents, currentDate, setTailwindEvents, setSelectedDay, selectedDay, addEvent, profile}
  

  return (
    <Container className="pb-16 pt-20 text-center lg:pt-32">
      
      <Slideover
        isShowing={isSlideoverOpen}
        setIsShowing={setIsSlideoverOpen}
        currentDate={selectedDay}
        setEvents={setEvents}
        events={events}
        editMode={isSlideoverEdit}
        setEditMode={setIsSlideoverEdit}
        selectedEvent={selectedEvent}
        selectedDay={selectedDay}
        setSelectedEvent={setSelectedEvent}
        session={session}
        profile={profile}
        isNewEvent={isNewEvent}
        setIsNewEvent={setIsNewEvent}
        
      />
      {/* <Calendar
        defaultDate={defaultDate}
        events={events}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        showMultiDayTimes
        step={60}
        views={[Views.MONTH, Views.DAY]}
        view={calendarToggle.view}
        defaultView={calendarToggle.defaultView}
        calendarToggle
        selectable
        components={{ toolbar: Tabs }}
        toolbar={true}
      /> */}

     <TailwindCalendar {...props} />

    </Container>
  )
}

export default PickupCalendar
