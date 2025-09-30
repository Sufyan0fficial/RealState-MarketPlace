import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { LoginAPI, RegisterAPI } from "../api/auth.api";
import { useState } from "react";
import { alert } from "../utils/helper.utils";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/userSlice';
import OAuth from '../components/OAuth';

function Login() {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleUserLogin = async(data) => {
    try {
      setLoading(true)
      const res = await LoginAPI(data)
      if(res.status === 200){
        dispatch(loginSuccess(res.data.data))
        alert(messageApi,'success','User Logged In, Successfully')
        setTimeout(() => {
          
          navigate('/home')
        }, 700);
      }
    } catch (error) {
      setLoading(false)
       alert(messageApi,'error',(error.message || "Something went wrong"))
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex justify-center items-center flex-col gap-y-4">
      {contextHolder}
      <div className="text-3xl font-semibold mt-10 mb-2">Login</div>
      <Form
        name="Signup Form"
        className="w-full max-w-[450px]"
        onFinish={handleUserLogin}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please Input email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Email" className="!py-2" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Input password" }]}
        >
          <Input placeholder="Password" className="!py-2" />
        </Form.Item>
        {/* <div className="w-full max-w-[450px] rounded-md bg-gray-700 !py-[7px] px-4 text-center cursor-pointer flex justify-center items-center border"> */}
        <Button
          htmlType="submit"
          className="!w-full !h-11 !bg-gray-700 !text-white !relative"
          disabled={loading}
        >
          <span>
            SIGN IN
          </span>

          {
            loading &&
            <Spin size="small" className="[&_.ant-spin-dot]:text-white !absolute translate-x-12" />
          }
        </Button>

        {/* </div> */}



      </Form>
      <OAuth />
      {/* <div className="w-full max-w-[450px] rounded-md bg-red-700 py-[10px] px-4 text-white text-center uppercase cursor-pointer">
        Continue with Google
      </div> */}
      <div className="w-full max-w-[450px] flex justify-start items-center gap-2">
        <span>Don't have an account?</span>
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign up
        </span>
      </div>
    </div>
  )

}

export default Login