'use client'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect('/login')
    },
  })

  return (
    <>
      <Header />
      <main>
        <ProfileForm session={session} />
      </main>
      <Footer />
    </>
  )
}
