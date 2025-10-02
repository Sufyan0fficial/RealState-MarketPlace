import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListing } from '../api/auth.api'
import { Carousel, message, Spin } from 'antd';
import { alert } from '../utils/helper.utils';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ContactLandlord from '../components/contactLandlord';

function Listing() {
    const params = useParams()
    const [messageApi, contextHolder] = message.useMessage();
    const [listingData, setListingData] = useState(null)
    const user = useSelector(state => state.userSlice?.userData)
    const [sendMessage, setSendMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await getListing(params?.listingId)
                if (res.status === 200) {
                    setListingData(res.data.data)
                }
            } catch (error) {
                alert(messageApi, 'error', error.message || 'Something went wrong')
            }
        }
        fetchListing()
    }, [])
    return (
        <div className='w-full'>
            {contextHolder}
            <div className='w-full'>


                <Carousel autoplay fade arrows >
                    {listingData?.images.map((image, index) => (
                        <div key={index} className='w-full h-[calc(100vh-80px)]'>
                            <img src={`http://localhost:3000/${image}`} alt="listing_img" className='w-full h-full object-cover' />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className='w-full flex justify-center mt-10 mb-20 '>
                <div className='w-full lg:max-w-[700px] flex flex-col gap-4'>
                    <div className='text-xl font-semibold flex justify-start items-center gap-6'>
                        <span className=' max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap'>{listingData?.name} </span>
                        <span>-</span>
                        <div className='shrink-0'>
                            <span>{
                                listingData?.offer ?
                                    listingData?.disPrice :
                                    listingData?.regPrice
                            }$
                                <span>{listingData?.type == 'rent' && '/ Month'}</span>
                            </span>
                        </div>
                    </div>

                    <div className='flex gap-3 mt-2 items-start'>
                        <FaMapMarkerAlt color='#14532d' className='shrink-0 mt-1' />
                        <span className=' font-medium '>{listingData?.address}</span>
                    </div>

                    <div className='flex items-center gap-4 mt-4 flex-wrap'>
                        <div className='text-center text-white px-16 py-[6px] rounded-md flex justify-center items-center bg-red-800'>{`For ${listingData?.type}`}</div>
                        {
                            listingData?.offer &&

                            <div className='text-center text-white px-16 py-[6px] rounded-md flex justify-center items-center bg-green-800'>
                                ${listingData.regPrice - listingData.disPrice} discount
                            </div>
                        }
                    </div>


                    <div className='flex gap-2 items-start mt-4'>
                        <span className='font-semibold'>Description</span>
                        <span>-</span>
                        <span>{listingData?.description}</span>
                    </div>

                    <div className='flex gap-6 gap-y-2 mt-4 flex-wrap'>
                        <div className='flex gap-1 items-center text-[#14532d]'>
                            <FaBed color='#14532d' />
                            <span>{listingData?.beds}</span>
                            <span>{listingData?.beds > 1 ? 'Beds' : 'Bed'}</span>
                        </div>
                        <div className='flex gap-1 items-center text-[#14532d]'>
                            <FaBath color='#14532d' />
                            <span>{listingData?.baths}</span>
                            <span>{listingData?.baths > 1 ? 'Baths' : 'Bath'}</span>
                        </div>
                        <div className='flex gap-1 items-center text-[#14532d]'>
                            <FaParking color='#14532d' />
                            <span>{listingData?.parking ? 'Parking' : 'No Parking'}</span>
                        </div>
                        <div className='flex gap-1 items-center text-[#14532d]'>
                            <FaChair color='#14532d' />
                            <span>{listingData?.furnished ? 'Furnished' : 'No Furnished'}</span>
                        </div>
                    </div>

                    {
                        user?._id && user?._id !== listingData?.userRef && !sendMessage &&
                        <div className='w-full flex justify-center relative items-center mt-10 text-white text-center rounded-md bg-slate-700 py-3 tracking-wide uppercase cursor-pointer ' onClick={() => setSendMessage(true)}>
                            Contact Landlord
                            
                        </div>



                    }
                    {
                        sendMessage &&
                        <ContactLandlord listingData={listingData} setLoading={setLoading} />
                    }


                </div>

            </div>

        </div>
    )
}

export default Listing