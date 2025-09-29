import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase/firebase'
import { GoogleAuthApi } from '../api/auth.api'
import { alert } from '../utils/helper.utils'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../Redux/userSlice'

function OAuth() {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()

    const handleGoogleOAuth = async () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        if (result) {
            var { displayName:name, email, photoURL:photo } = result.user
            console.log('user info is', name, email, photo)
            try {
                const res = await GoogleAuthApi({ name:name, email:email, photo:photo })
                if (res.status === 200) {
                    dispatch(loginSuccess(res.data.data))
                    alert(messageApi, 'success', 'User Authenticated Successfully')
                    console.log('google auth response is', res)
                    setTimeout(() => {
                        window.location.href = '/home'
                    }, 700);
                }
            } catch (error) {
                console.log('error is', error)
                alert(messageApi, 'error', (error.response.data.message || "Something went wrong"))
            }
        }

    }
    return (
        <div className='w-full flex justify-center '>
            {contextHolder}
            <div className="w-full max-w-[450px] rounded-md bg-red-700 py-[10px] px-4 text-white text-center uppercase cursor-pointer" onClick={handleGoogleOAuth}>
                Continue with Google
            </div>
        </div>
    )
}

export default OAuth