import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='min-h-[100vh] flex flex-col bg-[#f1f5f1]'>
        <Header />
        <div className='flex-grow px-4'>

        <Outlet />
        </div>
    </div>
  )
}

export default Layout