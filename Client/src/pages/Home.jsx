import { Carousel, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchListings } from '../api/auth.api'
import { alert } from '../utils/helper.utils'
import Card from '../components/Card'

function Home() {
  const navigate = useNavigate()
  const [offerListings, setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [sellListings, setSellListings] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    const getListings = async () => {

      const offerQueryString = 'offer=true&limit=4'
      const rentQueryString = 'type=rent&limit=4'
      const sellQueryString = 'type=sell&limit=4'
      try {
        const offerRes = await fetchListings(offerQueryString)
        const rentRes = await fetchListings(rentQueryString)
        const sellRes = await fetchListings(sellQueryString)
        if (offerRes.status == 200) {
          setOfferListings(offerRes.data.data)
          setLoading(false)
        }
        if (rentRes.status == 200) {
          setRentListings(rentRes.data.data)
        }
        if (sellRes.status == 200) {
          setSellListings(sellRes.data.data)
        }
      } catch (error) {
        alert(messageApi, 'error', 'Something went wrong')
        setLoading(false)
      }
      finally{
        setLoading(false)
      }


    }
    getListings()

  }, [])
  return (
    
    
      loading ? 
      <div className='bg-transparent flex justify-center min-h-[calc(100vh-80px)] relative'>
            <Spin size='large' className="[&_.ant-spin-dot]:text-red-600 !absolute translate-x-12 translate-y-60" />
      </div>
      :
      <div>
        {contextHolder}
      <div className='!min-h-[calc(100vh-70px)]  px-6 flex items-center justify-center'>
        <div className='flex flex-col justify-center gap-y-3 xl:gap-y-5 xl:min-w-[1200px] xl:max-w-[1200px]'>
          <div className='text-4xl lg:text-6xl font-bold text-slate-700 tracking-tighter text-wrap '>
            <div className=''>
              Find your next <span className='text-slate-500'>Perfect</span> <br />Place with ease
            </div>
          </div>
          <div className='text-sm text-gray-400'>
            Sahand Estate will help you find your home fast, easy and comfortable <br /> Our expert support are always available.

          </div>
          <div className='text-indigo-800 font-semibold underline cursor-pointer ' onClick={() => navigate('/search')}>Let's Start now...</div>
        </div>
      </div>
      <div>
        <Carousel arrows autoplay>
          {
            offerListings?.length > 0 && offerListings?.map((item) => {
              return (
                <div className='h-[300px]'>
                  <img src={`${import.meta.env.VITE_API_BASE_URL}/${item?.images?.[0]}`} alt="carousel_img" className='w-full object-cover' />
                </div>
              )
            })
          }
        </Carousel>
      </div>
      <div className='flex justify-center items-center mt-20 mb-20'>
        <div className='w-full xl:min-w-[1200px] max-w-[1200px] flex flex-col gap-y-20'>
          <div>
            <div className='text-2xl font-semibold text-black '>
              Recent Offers
            </div>
            <div className='hover:underline text-sm text-indigo-600 cursor-pointer' onClick={()=>navigate('/search?offer=true')}>Show more offers</div>

            <div className='w-full flex flex-wrap items-stretch gap-4 mt-4'>

              {
                offerListings?.length > 0 ?
                  offerListings?.map((item) => {
                    return (
                      <Card item={item} />
                    )
                  })
                  :
                  <div>Data not found</div>
              }
            </div>
          </div>
          <div>
            <div className='text-2xl font-semibold text-black '>
              Recent Places for Rent
            </div>
            <div className='hover:underline text-sm text-indigo-600 cursor-pointer'onClick={()=>navigate('/search?type=rent')}>Show more offers</div>

            <div className='w-full flex flex-wrap items-stretch gap-4 mt-4'>

              {
                rentListings?.length > 0 ?
                  rentListings?.map((item) => {
                    return (
                      <Card item={item} />
                    )
                  })
                  :
                  <div>Data not found</div>
              }
            </div>
          </div>
          <div>
            <div className='text-2xl font-semibold text-black '>
              Recent Places for Sale
            </div>
            <div className='hover:underline text-sm text-indigo-600 cursor-pointer'onClick={()=>navigate('/search?type=sell')}>Show more offers</div>

            <div className='w-full flex flex-wrap items-stretch gap-4 mt-4'>

              {
                sellListings.length > 0 ?
                  sellListings?.map((item) => {
                    return (
                      <Card item={item} />
                    )
                  })
                  :
                  <div>Data not found</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default Home