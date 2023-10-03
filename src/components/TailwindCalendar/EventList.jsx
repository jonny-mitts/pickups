import { nth } from '@/utils/dateUtils'
import { Menu, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import { classNames } from '@/utils/classNames'

const EventList = (props) => {
  const { selectedDay = {}, tailwindEvents, openDay, profile } = props
  console.log('🚀 ~ file: EventList.jsx:12 ~ profile:', profile)
  const { events = [] } = selectedDay
  const [eventLocationData, setEventLocationData] = useState(null)
  const [eventUserData, setEventUserData] = useState(null)

  useEffect(() => {
    const locations = []
    const userIds = []
    const getLocations = async () => {
      const url = `/api/locations/${locations.join()}`

      const res = await fetch(url)
      const { data } = await res.json()

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      setEventLocationData(data)
    }

    const getUsers = async () => {
      const url = `/api/profile/${userIds.join()}`

      const res = await fetch(url)
      const { data } = await res.json()

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      setEventUserData(data)
    }

    tailwindEvents.forEach(({ events = [] }, i) => {
      if (events && events.length) {
        console.log(
          '🚀 ~ file: EventList.jsx:34 ~ tailwindEvents.forEach ~ events:',
          events
        )
        events.forEach(({ location, userId }) => {
          
          if (!locations.includes(location)) {
            locations.push(location)
          }
          if (!userIds.includes(userId)) {
            userIds.push(userId)
          }
          console.log(
            '🚀 ~ file: EventList.jsx:56 ~ events.forEach ~ userId:',
            userIds,
            userId
          )
        })
      }
    })

    getLocations()
    getUsers()
  }, [tailwindEvents])

  const getUserData = (uid) => {
    const userData = eventUserData.filter(
      ({ id }) => id.toString() === uid.toString()
    )
    return userData?.[0] ? userData[0].image : ''
  }

  const getLocation = (lid) => {
    const locData = eventLocationData.filter(
      ({ id }) => id.toString() === lid.toString()
    )
    return locData?.[0] ? locData[0].label : ''
  }

  return (
    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
      {events.map((meeting) => {
        return (
          <li
            key={meeting.id}
            className="relative flex space-x-6 py-6 xl:static"
          >
            {eventUserData && (
              <img
                src={getUserData(meeting.userId)}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              />
            )}

            <div className="flex-auto">
              <h3 className="pr-10 text-left font-semibold text-gray-900 xl:pr-0">
                {meeting.name}
              </h3>
              <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                <div className="flex items-start space-x-3">
                  <dt className="mt-0.5">
                    <span className="sr-only">Date</span>
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <time dateTime={meeting.datetime}>
                      {meeting.datetime.toLocaleString('default', {
                        month: 'long',
                      })}{' '}
                      {nth(meeting.datetime.getDate())} at {meeting.time}
                      {/* {JSON.stringify(meeting)} */}
                    </time>
                  </dd>
                </div>
                <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                  <dt className="mt-0.5">
                    <span className="sr-only">Location</span>
                    <MapPinIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>{eventLocationData && getLocation(meeting.location)}</dd>
                </div>
              </dl>
            </div>
            <Menu
              as="div"
              className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
            >
              <div>
                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Cancel
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        )
      })}
    </ol>
  )
}

export default EventList
