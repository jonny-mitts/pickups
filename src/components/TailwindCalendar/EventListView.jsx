import CompactCalendar from './CompactCalendar';
import EventList from './EventList';

const meetings = [
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  // More meetings...
]


const EventListView = (props) =>{
  const {selectedDay = {}, tailwindEvents, openDay} = props;
  const { events = [] } = selectedDay
  const localProps = {
    ...props,
    wrappingClasses:"mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9"
  }
  return <>
  <div className="flex flex-auto flex-col overflow-auto">
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
     <CompactCalendar {...localProps}/>
     <EventList {...localProps} />
    </div>
  </div>
  </>;
}

export default EventListView;
