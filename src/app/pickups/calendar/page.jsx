'use client'

import PickupCalendar from '@/components/PickupCalendar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
       redirect('/login')
    },
  })

  const [profile, setProfile] = useState({})
  
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

  return (
    <>
      <Header />
      <main>
        <PickupCalendar session={session} profile={profile} />
      </main>
      <Footer />
    </>
  )
}
