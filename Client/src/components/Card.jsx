import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Card({item}) {
    const navigate = useNavigate()
    return (
        <div className='w-full sm:w-[47%] lg:w-[30%]  flex flex-col shadow-lg rounded-md relative '>
            <img src={`${import.meta.env.VITE_API_BASE_URL}/${item.images?.[0]}`} alt="listing_img" className='w-full object-cover h-56 rounded-t-md' />

            <div className='px-4 py-4 flex flex-col gap-y-2 justify-between flex-grow cursor-pointer' onClick={() => navigate(`/listing/${item?._id}`)}>
                <div className='flex flex-col gap-y-2'>
                    <div className='font-semibold text-lg '>{item?.name}</div>
                    <div className='flex items-start gap-2'>
                        <FaMapMarkerAlt color='#14532d' className='shrink-0 mt-1' />
                        <div className='w-full '>
                            <div className='line-clamp-2 text-sm font-light'>{item?.address}</div>
                        </div>
                    </div>
                    <div className='line-clamp-2 text-sm font-light'>{item?.description}</div>
                </div>
                <div className='mt-3'>
                    <div className='flex items-center font-semibold text-gray-600 text-lg'>
                        <span>${item?.regPrice}{" "}</span>
                        {
                            item?.offer && <span>/ month</span>
                        }
                    </div>
                    <div className='flex items-center gap-6 font-semibold text-xs mt-1'>
                        <span>{item?.beds}{" "}{item?.beds?.length > 0 ? 'Beds' : 'Bed'}</span>
                        <span>{item?.baths}{" "}{item?.baths?.length > 0 ? 'Baths' : 'Baths'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
