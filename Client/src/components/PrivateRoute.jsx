import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const user = useSelector(state => state.userSlice?.userData)
  return (
    
        user?._id ? <>{<Outlet />}</> : <Navigate to={'/login'} />
    
  )
}

export default PrivateRoute