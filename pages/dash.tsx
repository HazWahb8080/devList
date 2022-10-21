import React from 'react'
import Header from '../components/header/Header';
import { useSession } from "next-auth/react";
import ProfileCompletion from '../components/sections/ProfileCompletion';
import MainBuilder from '../components/sections/main/MainBuilder';


function DashboardPage() {
  const {data:session} = useSession();
  return (
    <main className='w-full min-h-screen items-start justify-start flex flex-col'>
      <Header session={session}/>
      <div className='grid grid-cols-12 place-items-start gap-x-4 w-full min-h-screen'>
        <ProfileCompletion/>
        <MainBuilder/>
        <div className='col-span-1 border border-red-600 py-2 w-full h-full'></div>
      </div>
    </main>
  )
}

export default DashboardPage