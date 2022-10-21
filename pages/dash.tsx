import React from 'react'
import Header from '../components/header/Header';
import { useSession } from "next-auth/react";


function DashboardPage() {
  const {data:session} = useSession();
  return (
    <div className='w-full min-h-screen items-start justify-start flex flex-col'>
      <Header session={session}/>
    </div>
  )
}

export default DashboardPage