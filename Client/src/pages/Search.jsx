import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListings } from '../api/auth.api'
import { alert } from '../utils/helper.utils'
import { message } from 'antd'
import { FaMapMarkerAlt } from 'react-icons/fa'

function Search() {
    const [filters, setFilter] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'createdAt',
        order: 'desc'
    })
    const navigate = useNavigate()
    console.log('filtes are', filters)
    const [messageApi, contextHolder] = message.useMessage()
    const [listings, setListings] = useState([])
    console.log('listings are', listings)

    useEffect(() => {
        console.log('rerendered')
        const searchParams = new URLSearchParams(location.search)
        const searchTerm = searchParams.get('searchTerm') || ''
        const type = searchParams.get('type') || 'all'
        const offer = searchParams.get('offer') === 'true'
        const furnished = searchParams.get('furnished') === 'true'
        const parking = searchParams.get('parking') === 'true'
        const sort = searchParams.get('sort') || 'createdAt'
        const order = searchParams.get('order') || 'desc'

        const queryString = searchParams.toString()

        setFilter({
            searchTerm, type, offer, furnished, parking, sort, order
        })

        const getAllListings = async () => {
            try {

                const res = await fetchListings(queryString)
                if (res.status == 200) {
                    setListings(res.data.data)
                }
            } catch (error) {
                alert(messageApi, 'error', 'Something Went Wrong')
            }
        }
        getAllListings()

    }, [location.search])

    const handleChange = (e) => {
        const { id, value, checked } = e.target
        console.log('id', id)
        if (id == 'searchTerm') {
            setFilter((pre) => ({ ...pre, searchTerm: value }))
        }
        else if (id == 'sort_order') {
            const sort = value.split('_')[0]
            const order = value.split('_')[1]
            setFilter((pre) => ({ ...pre, sort: sort, order: order }))
        }

        else if (id == 'all' || id == 'rent' || id == 'sell') {
            setFilter(pre => ({ ...pre, type: id }))
        }

        else {
            setFilter((pre) => ({ ...pre, [id]: checked }))
        }
    }

    const handleSearch = () => {
        const searchParms = new URLSearchParams(window.location.search)
        searchParms.set('searchTerm', filters.searchTerm)
        searchParms.set('type', filters.type)
        searchParms.set('offer', filters.offer)
        searchParms.set('furnished', filters.furnished)
        searchParms.set('parking', filters.parking)
        searchParms.set('sort', filters.sort)
        searchParms.set('order', filters.order)
        const queryString = searchParms.toString()
        navigate(`/search?${queryString}`)
    }

    return (
        <div className='w-full flex flex-col lg:flex-row gap-10'>
            {contextHolder}
            <div className='w-full lg:w-[30%] flex flex-col gap-y-10 border-r border-gray-400 px-4 shrink-0'>
                <div className='flex gap-2 items-center mt-6'>
                    <span className='shrink-0'>Search Term :</span>
                    <input type="text" id='searchTerm' placeholder='Search...' value={filters.searchTerm} onChange={handleChange} className='focus:outline-0 bg-white w-full border border-gray-400 rounded-md px-4 py-2 text-black' />
                </div>
                <div className='flex items-start  gap-x-4 gap-y-1'>
                    <span>Type:</span>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='all' className='w-5 h-5' checked={filters.type == 'all'} onChange={handleChange} />

                            <label htmlFor="all" className='cursor-pointer'>
                                Rent & Sale
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='rent' className='w-5 h-5' checked={filters.type == 'rent'} onChange={handleChange} />

                            <label htmlFor="rent" className='cursor-pointer'>
                                Rent
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='sell' className='w-5 h-5' checked={filters.type == 'sell'} onChange={handleChange} />

                            <label htmlFor="sell" className='cursor-pointer'>
                                Sale
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='offer' className='w-5 h-5' checked={filters.offer} onChange={handleChange} />

                            <label htmlFor="offer" className='cursor-pointer'>
                                Offer
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex items-start  gap-x-4 gap-y-1'>
                    <span>Amenities:</span>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='parking' className='w-5 h-5' checked={filters.parking} onChange={handleChange} />

                            <label htmlFor="parking" className='cursor-pointer'>
                                Parking
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='furnished' className='w-5 h-5' checked={filters.furnished} onChange={handleChange} />

                            <label htmlFor="furnished" className='cursor-pointer'>
                                Furnished
                            </label>
                        </div>

                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='shrink-0'>Sort:</div>
                    <select name="sort_order" id="sort_order" value={`${filters.sort}_${filters.order}`} onChange={handleChange} className='focus:outline-0 w-full shrink px-4 py-2 border border-gray-400 rounded-md bg-white'>
                        <option value="regPrice_desc">Price high to low</option>
                        <option value="regPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <div className='uppercase text-center flex items-center justify-center text-white bg-slate-700 rounded-md py-[10px] cursor-pointer' onClick={handleSearch}>
                    Search
                </div>
            </div>
            <div className='w-full lg:w-[70%] flex flex-wrap items-stretch gap-4 mt-6'>

                {
                    listings?.length > 0 && listings.map((item) => {
                        return (
                            <div className='w-full sm:w-[47%] lg:w-[30%]  flex flex-col shadow-lg rounded-md relative '>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/${item.images?.[0]}`} alt="listing_img" className='w-full object-cover h-56 rounded-t-md'/>

                                <div className='px-4 py-4 flex flex-col gap-y-2 justify-between flex-grow cursor-pointer' onClick={()=>navigate(`/listing/${item?._id}`)}>
                                    <div className='flex flex-col gap-y-2'>
                                <div className='font-semibold text-lg '>{item?.name}</div>
                                <div className='flex items-start gap-2'>
                                    <FaMapMarkerAlt color='#14532d' className='shrink-0 mt-1'/>
                                    <div className='w-full '>
                                    <div className='line-clamp-2 text-sm font-light'>{item?.address}</div>
                                    </div>
                                </div>
                                <div className='line-clamp-2 text-sm font-light'>{item?.description}</div>
                                </div>
                                <div>
                                <div className='flex items-center font-semibold text-gray-600 text-lg'>
                                    <span>${item?.regPrice}{" "}</span>
                                    {
                                        item?.offer && <span>/ month</span>
                                    }
                                </div>
                                <div className='flex items-center gap-6 font-semibold text-sm mt-1'>
                                    <span>{item?.beds}{" "}{item?.beds?.length > 0 ? 'Beds' : 'Bed'}</span>
                                    <span>{item?.baths}{" "}{item?.baths?.length > 0 ? 'Baths' : 'Baths'}</span>
                                </div>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Search