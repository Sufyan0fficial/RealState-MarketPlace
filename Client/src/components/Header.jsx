import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const data = useSelector(state => state.userSlice.userData)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    console.log('search term is',searchTerm)
    const handleSubmit = (e) => {
        if (e.key === 'Enter' && searchTerm) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('searchTerm', searchTerm);
            const queryString = searchParams.toString();
            navigate(`/home?${queryString}`)
        }
    }

    useEffect(() => {
        console.log('action getting triggerd')
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);
    return (
        <div className='flex justify-center items-center bg-[#e2e8f0] w-full px-3 md:px-6 py-4'>
            <div className='flex justify-between items-center xl:min-w-[1200px] xl:max-w-[1200px] gap-4 md:gap-10 w-full'>
                <div className='text-lg md:text-4xl font-bold tracking-tight flex gap-2 cursor-pointer' onClick={() => navigate('/home')
                }>
                    <span className='text-red-400'>Sufyan</span>
                    <span className='text-gray-700'>Estate</span>
                </div>
                <div className='flex-grow '>

                    <input type="text" placeholder='Search ...' value={searchTerm} className='placeholder:text-gray-400 bg-white rounded-sm py-2 px-4 focus:outline-0 text-black w-full' onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSubmit} />

                </div>
                <div className='flex gap-4 items-center'>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={() => navigate('/home')}>Home</div>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={() => navigate('/about')}>About</div>
                    {
                        data?._id ?
                            <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer flex justify-center items-end' onClick={() => navigate('/profile')}>
                                <img src={data?.photo}
                                    alt="profile_img" className='' />
                            </div> :

                            <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 ' onClick={() => navigate('/login')}>Login</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Header