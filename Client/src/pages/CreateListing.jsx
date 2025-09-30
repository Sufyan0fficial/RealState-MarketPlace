import React, { useEffect, useState } from 'react'
import { alert } from '../utils/helper.utils'
import { message, Spin } from 'antd'
import { set } from 'mongoose'
import { createListingApi } from '../api/auth.api'

function CreateListing() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        address: '',
        beds: 1,
        baths: 1,
        regPrice: 1,
        disPrice: 1,
        type: 'rent'
    })
    const [booleanData, setBooleanData] = useState({
        sell: false,
        rent: false,
        parking: false,
        furnished: false,
        offer: false,
    })
    const [fileData, setFileData] = useState([])
    const [completeData, setcompleteData] = useState({})
    console.log('complete data is', completeData)
    console.log('file data is', fileData)

    useEffect(() => {
        setcompleteData({ ...data, ...booleanData, images: fileData })
    }, [data, booleanData, fileData])


    const [messageApi, contextHolder] = message.useMessage();

    const handleListing = async () => {
        if (completeData.regPrice < completeData.disPrice) {
            alert(messageApi, 'error', 'Discounted price should be less than regular price')
            return;
        }
        if (!completeData.name || !completeData.description || !completeData.address || !completeData.beds || !completeData.baths || !completeData.regPrice || completeData.images.length === 0) {
            alert(messageApi, 'error', 'All fields are required')
            return;
        }
        const formData = new FormData()
        formData.append('name', completeData.name)
        formData.append('description', completeData.description)
        formData.append('address', completeData.address)
        formData.append('beds', completeData.beds)
        formData.append('baths', completeData.baths)
        formData.append('regPrice', completeData.regPrice)
        formData.append('disPrice', completeData.disPrice)
        formData.append('sell', completeData.sell)
        formData.append('rent', completeData.rent)
        formData.append('parking', completeData.parking)
        formData.append('furnished', completeData.furnished)
        formData.append('offer', completeData.offer)
        if (Array.isArray(fileData)) {

            fileData.forEach((file) => {
                formData.append('images', file)
            })
        }
        else {
            const ArrayedFileData = Array.from(fileData)
            ArrayedFileData.forEach((file) => {
                formData.append('images', file)
            })
        }

    
    // formData.append('images', completeData.images)
    // for (let i = 0; i < completeData.images.length; i++) {
    //     formData.append('images', completeData.images[i])
    // }

    try {
        setLoading(true)
        const res = await createListingApi(formData)
        if (res.status === 200) {
            setLoading(false)
            alert(messageApi, 'success', 'Listing created successfully')

        }
    } catch (error) {
        setLoading(false)
        alert(messageApi, 'error', (error.message || 'Something went wrong'))
    }
}

const handleChange = (e) => {
    const { name, value } = e.target
    setData((pre) => ({ ...pre, [name]: value }))

}

const handleBooleanChange = (e) => {
    const { name, checked } = e.target
    setBooleanData((pre) => ({ ...pre, [name]: checked }))
    if (name === 'sell') {
        setData((pre) => ({ ...pre, type: 'sell' }))
        setBooleanData((pre) => ({ ...pre, rent: false, sell: true }))
    }
    else if (name === 'rent') {
        setData((pre) => ({ ...pre, type: 'rent' }))
        setBooleanData((pre) => ({ ...pre, sell: false, rent: true }))
    }
}

const handleFileChange = (e) => {
    const files = e.target.files
    if (files.length > 6) {
        alert(messageApi, 'error', 'Max 6 images are allowed, only first 6 will be uploaded')
        const allowedFiles = Array.from(files).slice(0, 6)
        setFileData(allowedFiles)
        return;
    }
    setFileData(files)
}
return (
    <div>
        <h1 className='text-3xl font-bold text-black text-center mt-10'>Create a Listing</h1>
        {contextHolder}
        <div>
            <form action="" className='w-full max-w-[960px] mx-auto mt-6 flex flex-col lg:flex-row gap-y-4 gap-6 mb-10'>
                <div className='w-full lg:w-1/2'>
                    <div className='w-full flex flex-col gap-y-3'>
                        <input type="text" placeholder='Name' name='name' className='w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-0' onChange={handleChange} />

                        <textarea type="text" placeholder='Description' name='description' className='w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-0' onChange={handleChange}></textarea>
                        <input type="text" placeholder='Address' name='address' className='w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-0' onChange={handleChange} />
                    </div>
                    <div className='w-full flex flex-wrap mt-4 gap-4 justify-between'>
                        <div className='flex gap-2 items-center '>
                            <input type="checkbox" className='w-5 h-5' id='sell' name='sell' checked={completeData.type == 'sell'} onChange={handleBooleanChange} />
                            <label htmlFor="sell" className='text-lg cursor-pointer'>Sell</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" defaultChecked defaultValue={true} checked={completeData.type == 'rent'} className='w-5 h-5' id='rent' name='rent' onChange={handleBooleanChange} />
                            <label htmlFor="rent" className='text-lg cursor-pointer'>Rent</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" className='w-5 h-5' id='parking' name='parking' onChange={handleBooleanChange} />
                            <label htmlFor="parking" className='text-lg cursor-pointer'>Parking Spot</label>
                        </div>
                        <div className='flex gap-2 items-center'>

                            <input type="checkbox" className='w-5 h-5' id='furnished' name='furnished' onChange={handleBooleanChange} />
                            <label htmlFor="furnished" className='text-lg cursor-pointer'>Furnished</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="checkbox" className='w-5 h-5' id='offer' name='offer' onChange={handleBooleanChange} />
                            <label htmlFor="offer" className='text-lg cursor-pointer'>Offer</label>
                        </div>

                    </div>
                    <div className='mt-4 flex items-center gap-6'>
                        <div className='flex gap-2 items-center '>
                            <input type="number" defaultValue={1} min={1} id='beds' name='beds' className=' flex justify-center text-center items-center border focus-within:outline-0 bg-white py-3 w-20 px-2 border-gray-400 rounded-md' onChange={handleChange} />
                            <label htmlFor="beds">Beds</label>
                        </div>
                        <div className='flex gap-2 items-center '>
                            <input type="number" defaultValue={1} id='baths' min={1} className=' flex justify-center text-center items-center border focus-within:outline-0 bg-white py-3 w-20 px-2 border-gray-400 rounded-md' name='baths' onChange={handleChange} />
                            <label htmlFor="baths">Baths</label>
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-3'>
                        <div className='flex gap-2 items-center '>
                            <input type="number" defaultValue={1} id='reg-price' min={1} className=' flex justify-center text-center items-center border focus-within:outline-0 bg-white py-3 w-28 px-2 border-gray-400 rounded-md' name='regPrice' onChange={handleChange} />
                            <label htmlFor="reg-price" className='flex flex-col items-center'>
                                <span>Regular Price</span>
                                <span className='text-xs'>{!completeData.sell && '($/Month)'}</span>
                            </label>
                        </div>
                        {
                            completeData.offer &&
                            <div className='flex gap-2 items-center '>
                                <input type="number" defaultValue={1} id='dis-price' min={1} className=' flex justify-center text-center items-center border focus-within:outline-0 bg-white py-3 w-28 px-2 border-gray-400 rounded-md' name='disPrice' onChange={handleChange} />
                                <label htmlFor="dis-price" className='flex flex-col items-center'>
                                    <span>Discounted Price</span>
                                    <span className='text-xs'>{!completeData.sell && '($/Month)'}</span>
                                </label>
                            </div>
                        }
                    </div>

                </div>
                <div className='w-full lg:w-1/2'>
                    <div>
                        <span className='font-semibold'>Images:</span>
                        <span className='ml-2'>The first image will be the cover (max 6)</span>
                    </div>
                    <div className='flex justify-between gap-4 items-center mt-3 mb-1'>
                        <div className='w-full border border-gray-300 rounded-md mt-2 p-4 ' >
                            <label htmlFor="file">
                                <input type="file" multiple className='border w-full py-1 px-2' name='images' onChange={handleFileChange} id='file' accept='image/*' />
                            </label>

                        </div>
                        {/* <button
                                type='button'
                                // disabled={uploading}
                                // onClick={handleImageSubmit}
                                className='px-3 h-16 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                            >
                                Upload
                            </button> */}
                    </div>
                    <div className='uppercase h-[50px] w-full bg-[#334155] text-white text-center rounded-md flex justify-center items-center mt-6 cursor-pointer' onClick={handleListing}>
                        <span>Create Listing</span>
                        {
                            loading &&
                            <Spin size="small" className="[&_.ant-spin-dot]:text-white !absolute translate-x-20" />
                        }
                    </div>
                </div>

            </form>
        </div>
    </div>
)
}

export default CreateListing