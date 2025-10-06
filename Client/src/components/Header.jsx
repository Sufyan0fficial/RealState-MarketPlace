import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { isValidURL } from '../utils/helper.utils'

function Header() {
    const navigate = useNavigate()
    const data = useSelector(state => state.userSlice?.userData)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    console.log('search term is', searchTerm)
    const handleSearch = ()=>{
        const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('searchTerm', searchTerm);
            const queryString = searchParams.toString();
            navigate(`/search?${queryString}`)
    }
    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
           handleSearch() 
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
                <div className='text-lg md:text-4xl font-bold tracking-tight flex gap-2 cursor-pointer' onClick={() => navigate('/')
                }>
                    <span className='text-red-400'>Sufyan</span>
                    <span className='text-gray-700'>Estate</span>
                </div>
                <div className='flex-grow '>

                    <div className='relative'>
                    <input type="text" placeholder='Search ...' value={searchTerm} className='placeholder:text-gray-400  bg-white rounded-sm py-2 px-4 focus:outline-0 text-black w-full' onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSubmit} />
                    <FaSearch className='absolute right-4 top-3 cursor-pointer' onClick={handleSearch}/>
                    </div>


                </div>
                <div className='flex gap-4 items-center'>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={() => navigate('/')}>Home</div>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={() => navigate('/about')}>About</div>
                    {
                        data?._id ?
                            <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer flex justify-center items-end' onClick={() => navigate('/profile')}>
                                <img src={isValidURL(data?.photo) ? data.photo : `${import.meta.env.VITE_API_BASE_URL}/${data.photo}`}
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