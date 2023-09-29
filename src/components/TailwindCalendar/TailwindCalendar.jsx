import { useState } from "react";
import MonthView from "./MonthView";
import DayView from "./DayView";
import CalendarHeader from "./CalendarHeader";

const Views = {
    MONTH:"month",
    DAY:"day"
}

const TailwindCalendar = (props) => {
    const {tailwindEvents, setTailwindEvents, selectedDay = {}, setSelectedDay, currentDate} = props;
    
    const [currentView, setCurrentView] = useState(Views.DAY);
    const [currentViewDate,setCurrentViewDate] = useState(new Date())

    const localProps = {
        ...props,
        currentView, setCurrentView, selectedDay, currentViewDate, setCurrentViewDate
    }

    // return <MonthView {...props} />;
    return <div className="lg:flex lg:h-full lg:flex-col">
        {/* <h1>{selectedDay ? selectedDay.date.toString() : moment(new Date()).format('YYYY-MM-DD')}</h1>*/}
        {/* <h2>{JSON.stringify(selectedDay)}</h2>  */}
        <CalendarHeader {...localProps}  />
        {currentView === Views.MONTH && <MonthView {...localProps}  />}
        {currentView === Views.DAY && <DayView {...localProps} /> }
    </div>;
    
}

export default TailwindCalendar;