import React, { useEffect, useState } from 'react'
import { fetchLandlordUser } from '../api/auth.api'
import { message } from 'antd';
import { alert } from '../utils/helper.utils';
import { Link } from 'react-router-dom';

function ContactLandlord({ listingData }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [landLordUser, setLandLordUser] = useState(null)
    const [queryMessage, setQueryMessage] = useState('')
    console.log('landlord user is', landLordUser)

    useEffect(() => {
        const fetchLandlordDetails = async () => {
            try {
                const res = await fetchLandlordUser(listingData?.userRef)
                if (res.status === 200) {
                    setLandLordUser(res.data.data)

                }
            } catch (error) {
                alert(messageApi, 'error', (error.message || "Something went wrong"))

            }
        }
        fetchLandlordDetails()
    }, [listingData.userRef])
    return (
        <div>
            {contextHolder}
            <div>
                <div className='flex items-center gap-2 mt-6 mb-3'>
                    Contact
                    <span className='font-semibold'>{landLordUser?.name}</span>
                    for
                    <span className='font-semibold'>{listingData?.name}</span>
                </div>
                <textarea name="" id="" rows={4} placeholder='Type Message...' className='focus:outline-0 border border-gray-400 w-full rounded-md bg-white px-4 py-2' onChange={(e) => setQueryMessage(e.target.value)}></textarea>
                <button
                    onClick={() => {
                        const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${landLordUser?.email}&su=${encodeURIComponent(listingData?.name || '')}&body=${encodeURIComponent(queryMessage || '')}`;
                        window.open(
                            mailUrl,
                            'gmailComposeWindow',
                            'width=800,height=600,top=100,left=100' 
                        );
                    }}
                    className="w-full flex justify-center items-center text-white mt-2 text-center rounded-md bg-slate-700 py-3 tracking-wide uppercase cursor-pointer"
                >
                    Send Message
                </button>

            </div>
        </div>
    )
}

export default ContactLandlord