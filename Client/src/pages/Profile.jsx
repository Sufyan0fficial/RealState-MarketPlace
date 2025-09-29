import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { UpdateUser } from '../api/auth.api'
import { Button, Form, Input, message, Spin } from 'antd'
import { alert } from '../utils/helper.utils'
import { useState } from 'react'
import { loginSuccess } from '../Redux/userSlice'

function Profile() {
  const navigate = useNavigate()
  const user = useSelector(state => state.userSlice?.userData)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

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
      alert(messageApi, 'error', (error.response.data.message || "Something went wrong"))
      setLoading(false)
    }
  }



return (
  

  user?._id ?
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
    </div> :
    <Navigate to={'/login'} />


)
}

export default Profile