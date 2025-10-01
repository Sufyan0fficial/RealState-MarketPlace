import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { deleteListing, deleteUser, getListings, UpdateUser, userSignout } from '../api/auth.api'
import { Button, Form, Input, List, message, Spin } from 'antd'
import { alert } from '../utils/helper.utils'
import { useState } from 'react'
import { loginSuccess } from '../Redux/userSlice'
// import { deleteUser } from 'firebase/auth'

function Profile() {
  const navigate = useNavigate()
  const user = useSelector(state => state.userSlice?.userData)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [listings, setListings] = useState([])

  const handleEditProfile = async (data) => {
    setLoading(true)
    try {
      const res = await UpdateUser(data, user._id)
      if (res.status === 200) {
        setLoading(false)
        dispatch(loginSuccess(res.data.data))
        alert(messageApi, 'success', 'Profile Updated Successfully')


        setTimeout(() => {

          navigate('/home')
        }, 1000);
      }
    } catch (error) {
      console.log('error while updating profile', error)
      setLoading(false)
      alert(messageApi, 'error', (error.message || "Something went wrong"))
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user._id)
      alert(messageApi, 'success', 'User Account Deleted Successfully')
      setTimeout(() => {
        dispatch(loginSuccess(null))
        navigate('/register')
      }, 700);
    } catch (error) {
      alert(messageApi, 'error', (error.message || "Something went wrong"))
    }
  }


  const handleUserSignout = async () => {
    try {
      const res = await userSignout()
      console.log('signout response is', res)
      if (res.status === 200) {
        alert(messageApi, 'success', 'User Signout Successfully')
        setTimeout(() => {
          dispatch(loginSuccess(null))
        }, 700);
      }
    } catch (error) {
    }
  }


  const handleGetListings = async () => {
    try {
      const res = await getListings(user._id)
      if (res.status === 200) {
        res.data.data.length === 0 && alert(messageApi, 'info', 'No Listings Found')
        setListings(res.data.data)
      }
    } catch (error) {
      alert(messageApi, 'error', (error.message || "Something went wrong"))
    }
  }


  const handleDeleteListing = async (id) => {
    try {
      const res = await deleteListing(id)
      if (res.status === 200) {
        alert(messageApi, 'success', 'Listing Deleted Successfully')
        const updatedListings = listings.filter((listing) => listing._id !== id)
        setListings(updatedListings)
      }
    } catch (error) {
      alert(messageApi, 'error', (error.message || "Something went wrong"))
    }
  }



  return (


    <div className='mt-10 flex flex-col items-center'>
      {contextHolder}
      <div className='text-3xl font-semibold text-center'>Profile</div>
      <div className='w-full flex justify-center my-6'>
        <div className='w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-300 flex justify-center items-center'>
          <img src={user?.photo} alt="profile_img" className='self-center' />
        </div>


      </div>
      <Form
        name="Edit Profile Form"
        initialValues={{ name: user?.name, email: user?.email }}
        onFinish={handleEditProfile}
        className='w-full !max-w-[450px] mx-auto'
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "UserName is required", }]}
        >
          <Input placeholder="UserName" className="!py-2" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Please enter a valid email address" }]}
        >
          <Input placeholder="Email" className="!py-2" />
        </Form.Item>
        <Form.Item
          name="password"
        >
          <Input placeholder="Password" className="!py-2" />
        </Form.Item>
        <Button htmlType="submit" className='w-full !bg-[#3d4a5d] !h-[40px] !rounded-md !border-0 uppercase !text-white !relative' disabled={loading} >
          <span>UPDATE</span>
          {
            loading &&
            <Spin size="small" className="[&_.ant-spin-dot]:text-white !absolute translate-x-12" />
          }
        </Button>


      </Form>
      <div className='w-full max-w-[450px]'>
        <Link to='/create-listing' className='text-center h-[40px] flex justify-center items-center text-white bg-[#208646] rounded-md uppercase mt-3'>Create Listing</Link>
        <div className='w-full flex justify-between items-center mt-2 max-w-[450px]' >
          <button className='text-red-700 cursor-pointer ' onClick={handleDeleteAccount}>Delete Account</button>
          <button className='text-red-700 cursor-pointer' onClick={handleUserSignout}>Sign Out</button>
        </div>
        <div className='w-full flex justify-center items-center mt-10 text-green-600 text-lg cursor-pointer capitalize' onClick={handleGetListings}>Show Listings</div>
        <div className='w-full mt-10 mb-10'>
          {
            listings.length > 0 && listings.map((listing, index) => {
              return (
                <div key={listing._id} className='w-full max-w-[450px] border border-gray-300 rounded-md p-4 mt-4 flex justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                    <div>
                      <img src={`http://localhost:3000/${listing.images[0]}`} alt="listing_img" className=' w-[60px] h-[60px]  rounded-md' />
                    </div>
                    <div className='text-lg font-semibold max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>{listing.name}</div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='uppercase text-red-700 cursor-pointer' onClick={() => handleDeleteListing(listing?._id)}>Delete</div>
                    <Link to={`/edit-listing/${listing?._id}`}>
                    <div className='uppercase  text-green-700 cursor-pointer'>Edit</div>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>


  )
}

export default Profile