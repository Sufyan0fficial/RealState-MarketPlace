import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'

function App() {

  return (
   
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
