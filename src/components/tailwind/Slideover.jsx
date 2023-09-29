/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useForm } from 'react-hook-form'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Select from 'react-select'


import moment from 'moment'
import { encodeForTransport } from '@/utils/databaseUtils'
import { yearMonthDateFormat, ymdAndTime } from '@/utils/dateUtils'

export default function Slideover({
  isShowing = false,
  setIsShowing,
  events,
  setEvents,
  currentDate,
  editMode,
  setSelectedEvent,
  selectedEvent,
  selectedDay,
  session,
  profile,
  isNewEvent = true
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()

  const [user, setUser] = useState(null)
  const [offering, setOffering] = useState(null)
  const [selectOptions, setSelectOptions] = useState(null)
  const [locationValue, setLocationValue] = useState(null)
  const [locations, setLocations] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  useEffect(() => {
    const getLocationData = async () => {
      const res = await fetch('/api/locations')

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const { data } = await res.json()
      const refactoredData = data.map((item) => {
        const tempItem = { ...item }
        tempItem.value = tempItem.id.toString()
        return tempItem
      })
      setSelectOptions(refactoredData)
      setLocations(data)
    }
    getLocationData()
  }, [])

  useEffect(() => {
    
  }, [session, profile])
  

  useEffect(() => {
    
    reset(selectedEvent)
  }, [selectedEvent])



  async function postData({
    starttime,
    endtime,
    date,
    userSub,
    createDate,
    title,
    description,
    user_id,
    id
  }) {
    const payload = {
      starttime,
      endtime,
      date,
      userSub,
      createDate,
      title,
      description,
      user_id
    }

    if (id) {
      payload.id = id
      
    }
    
    const verb = editMode && !isNewEvent ? 'PATCH' : 'POST';

    const pickupSave = await fetch('/api/pickup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: verb,
      body: JSON.stringify(payload),
    })
    
    const pickup = await pickupSave.json()
    const transformedData = {
      id: pickup.data.id,
      title: decodeURIComponent(pickup.data.title).replace(/[!'()*]/g, unescape),
      start: getFormattedStringForTimeInput(pickup.data.starttime),
      end: getFormattedStringForTimeInput(pickup.data.endtime),
      description: decodeURIComponent(pickup.data.description).replace(/[!'()*]/g, unescape),
      user: pickup.data.userSub,
    }

    if(!isOwner){
      transformedData.is_accepted = 1;
      transformedData.accepted_by = profile.id;
    }

    setSelectedEvent(null);
    setEvents([...events, { ...transformedData }])
  }

  const getFormattedStringForTimeInput = (date) => {
    try{
      const dArray = String(date).split(':')
      const hours = dArray[1]
      const minutes = dArray[2].split(' ')[0]
      const dString = `${hours}:${minutes}`
      return dString
    }catch(e){
      return "00:00:00"
    }
    
  }

  const getDatePreparedForDatabase = (date, time) => {
    
    const d = yearMonthDateFormat(date)
    const hour = Number(time.split(':')[0])
    const minute = Number(time.split(':')[1])
    const argDate = d.setHour( hour ).setMinute(minute)
    const dateTime = ymdAndTime(argDate); 
    console.log("🚀 ~ file: Slideover.jsx:163 ~ getDatePreparedForDatabase ~ dateTime:", dateTime)
    
      //.format('YYYY-MM-DD  HH:mm:ss.000')

      
    let dateTimeParts = dateTime.split(/[- :]/) // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]-- // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one
    const dateObject = new Date(...dateTimeParts)
    return dateObject
  }

  const onSubmit = async (data) => {
    
    const starttime = getDatePreparedForDatabase(moment(currentDate.date).toDate(), data.starttime);
    const endtime = getDatePreparedForDatabase(moment(currentDate.date).toDate(),  data.endtime)
    const date = getDatePreparedForDatabase(moment(currentDate.date).toDate(), "00:00AM")
    const createDateObject = new Date()
    const createDate = getDatePreparedForDatabase(
      createDateObject,
      moment(createDateObject).format('HH:mm')
    )
    const userSub = 1
    const {
      title = 'This is the your title',
      description = 'this is a description',
      pid = null,
    } = data
    
    const payload = {
      starttime,
      endtime,
      date,
      createDate,
      userSub,
      title:encodeForTransport(title),
      description:encodeForTransport(description),
      user_id:profile.id
    }
    
    
    if (selectedEvent?.id) {
      payload.id = selectedEvent.id;
    }
    
    const response = await postData(payload)
  }

  const isOwner = () => (String(selectedEvent?.userId) === String(profile.id))
  const returnFormValue = (content) => <p className="block w-full py-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">{content}</p>

  return (
    <Transition.Root show={isShowing} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsShowing(false)}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Pick a time for{' '}
                            {/* {moment(currentDate).format('dddd - MM/DD/YYYY')} */}
                            {selectedDay?.date}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setIsShowing(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Pick a time and location so you can get your game
                            started!
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          
                          <div className="space-y-6 pb-5 pt-6">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 pb-5 sm:grid-cols-6">
                                <div className="sm:col-span-8">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      Title
                                    </h2>
                                  </label>
                                  <div className="mt-2">
                                    { (editMode) &&
                                    <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={
                                     selectedEvent?.title || 'Here is you default title'
                                    }

                                    {...register('title')}
                                    
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                                  />
                                    }
                                    {!editMode && returnFormValue(selectedEvent?.title)}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-x-6 gap-y-8 pb-5 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      Description
                                    </h2>
                                  </label>
                                  <div className="mt-2">
                                  { (editMode) &&
                                    <textarea
                                      defaultValue={selectedEvent?.description || 'Here is you default description, with a little more text than the title'}
                                      rows={4}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      type="text"
                                      id="description"
                                      name="description"
                                      {...register('description')}
                                    />
                                  }
                                  {!editMode && returnFormValue(selectedEvent?.description)}
                                  </div>
                                </div>
                              </div>
                              <div className=" grid grid-cols-1 gap-x-6 gap-y-8is pb-5 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="location"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      Location:
                                    </h2>
                                  </label>
                                  <div className="mt-2">
                                    {selectOptions && (
                                      <Select
                                        options={selectOptions}
                                        value={selectOptions.find(
                                          (c) => c.value === locationValue
                                        )}
                                        onChange={(val) => {
                                          setLocationValue(val.value)
                                        }}
                                        defaultValue={selectOptions.find(
                                          (c) =>
                                            c.value === '1' || c.value === 1
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 pb-5 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="starttime"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      Start Time:
                                    </h2>
                                  </label>
                                  <div className="mt-2">
                                    
                                  {editMode &&  <input
                                      type="time"
                                      id="starttime"
                                      name="starttime"
                                      defaultValue={
                                        editMode
                                          ? getFormattedStringForTimeInput(
                                              selectedEvent?.start
                                            )
                                          : '13:30:00'
                                      }
                                      {...register('starttime')}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />}
                                    {!editMode && getFormattedStringForTimeInput(selectedEvent?.start)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 pb-5 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="endtime"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                      End Time:
                                    </h2>
                                  </label>
                                  <div className="mt-2">
                                    {editMode && <input
                                      type="time"
                                      defaultValue={
                                        editMode
                                          ? getFormattedStringForTimeInput(
                                              selectedEvent?.end
                                            )
                                          : '20:30:00'
                                      }
                                      id="endtime"
                                      name="endtime"
                                      {...register('endtime')}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />}
                                    {!editMode && getFormattedStringForTimeInput(selectedEvent?.end)}
                                  </div>
                                </div>
                              </div>

                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setIsShowing(false)}
                      >
                        Cancel
                      </button>

                      {!editMode && (
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {isOwner() ? "Save" : "Accept Pickup"}
                        </button>
                      )}
                      {editMode && (
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update 
                        </button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
