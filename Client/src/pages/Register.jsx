import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { RegisterAPI } from "../api/auth.api";
import { useState } from "react";
import { alert } from "../utils/helper.utils";
import OAuth from "../components/OAuth";

function Register() {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  // const success = () => {
  //   messageApi.open({
  //     type: 'success',
  //     content: 'This is a success message',
  //   });
  // };

  console.log('lodaing is', loading)
  const navigate = useNavigate();
  const handleUserRegister = async (values) => {
    setLoading(true)
    try {
      const response = await RegisterAPI(values)
      console.log('api response is', response)
      if (response.status === 200) {
        alert(messageApi, 'success', "User has been successfully registered")
        setTimeout(() => {
          
          navigate('/login')
        }, 1000);
      }

    } catch (error) {
      console.log('error is',error)
      setLoading(false)
      alert(messageApi,"error",(error.response.data.message || "Something went wrong"))
    }
    finally {
      setLoading(false)
    }
  };


  return (
    <div className="w-full flex justify-center items-center flex-col gap-y-4">
      {contextHolder}
      <div className="text-3xl font-semibold mt-10 mb-2">Sign Up</div>
      <Form
        name="Signup Form"
        className="w-full max-w-[450px]"
        onFinish={handleUserRegister}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please Input username" }]}
        >
          <Input placeholder="Username" className="!py-2" />
        </Form.Item>
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
            SIGN UP
          </span>

          {
            loading &&
            <Spin size="small" className="[&_.ant-spin-dot]:text-white !absolute translate-x-12" />
          }
        </Button>

        {/* </div> */}



      </Form>
      <OAuth />
      <div className="w-full max-w-[450px] flex justify-start items-center gap-2">
        <span>Have an account?</span>
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}

export default Register;
