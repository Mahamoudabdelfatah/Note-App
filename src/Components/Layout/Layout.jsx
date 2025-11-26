import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
