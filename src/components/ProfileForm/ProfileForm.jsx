import { Container } from '../Container'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

const ratingsOptions = [
  { value: 2.5, label: '2.5' },
  { value: 3.0, label: '3.0' },
  { value: 3.5, label: '3.5' },
  { value: 4.0, label: '4.0' },
  { value: 4.5, label: '4.5' },
  { value: 5.0, label: '5.0' },
  { value: 5.5, label: '5.5' },
]

const ProfileForm = (props) => {
  const { session } = props
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm()

  const [selectOptions, setSelectOptions] = useState(null)
  const [locations, setLocations] = useState([])
  const [locationValue, setLocationValue] = useState(null)
  const [profile, setProfile] = useState({})
  const [ratingsValue, setRatingsValue] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch(
        '/api/profile?' + new URLSearchParams({ email: session?.user.email })
      )

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const { data } = await res.json()

      setProfile(data?.[0])
    }

    if(session?.user?.email){
        getProfile();
    }
    
  }, [session, session?.user])

  useEffect(() => {
    setLocationValue(profile.tennis_location);
    setRatingsValue(profile.tennis_rating);
    reset(profile)
  }, [profile, selectOptions, session, reset])

  useEffect(() => {}, [ratingsValue])

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

  const onSubmit = async (formData) => {
    
    const dataWOEmail = {...formData}
    delete dataWOEmail.email;
    
    const profileData = {
      ...dataWOEmail,
      email: profile.email,
      profileId: profile.id,
    }
    const tennisProfile = { tennis_location: locationValue, tennis_rating: ratingsValue }
    const payload = { ...profileData, ...tennisProfile };
    const response = await fetch('/api/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(payload),
    })

    const res = await response.json()
    const { data } = res

  }

  return (
    <Container className="pb-16 pt-20 lg:pt-32">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register('first_name')}
                    defaultValue={profile ? profile['first_name'] : ''}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={profile ? profile['last_name'] : ''}
                    {...register('last_name')}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="hidden"
                    defaultValue={profile ? profile['email'] : ''}
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    {...register('email')}
                  />
                  <input
                    id="displayEmail"
                    name="displayEmail"
                    type="text"
                    defaultValue={profile ? profile['email'] : ''}
                    disabled
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={profile ? profile['username'] : ''}
                    {...register('username')}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    {...register('address')}
                    defaultValue={profile ? profile['address'] : ''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    {...register('city')}
                    defaultValue={profile ? profile['city'] : ''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium font-semibold leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    {...register('state')}
                    defaultValue={profile ? profile['state'] : ''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    {...register('zip')}
                    defaultValue={profile ? profile['zip'] : ''}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Tennis Preferences
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Home Court:
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
                        (c) => c.value === profile.tennis_location
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="sm:col-span-1">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tennis Rating:
                  </label>
                  <div className="mt-2">
                    <Select
                      options={ratingsOptions}
                      value={ratingsOptions.find(
                        (c) => c.value === ratingsValue
                      )}
                      onChange={(val) => {
                        setRatingsValue(val.value)
                      }}
                      defaultValue={ratingsOptions.find(
                        (c) => {
                            return c.value === profile.tennis_rating
                        }
                      )}
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Container>
  )
}

export default ProfileForm
