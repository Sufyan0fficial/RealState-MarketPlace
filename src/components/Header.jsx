import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center bg-[#e2e8f0] w-full px-3 md:px-6 py-4'>
            <div className='flex justify-between items-center xl:min-w-[1200px] xl:max-w-[1200px] gap-4 md:gap-10 w-full'>
                <div className='text-lg md:text-4xl font-bold tracking-tight flex gap-2 '>
                    <span className='text-red-400'>Sufyan</span>
                    <span className='text-gray-700'>Estate</span>
                </div>
                <div className='flex-grow '>
                    <input type="text" placeholder='Search ...' className='placeholder:text-gray-400 bg-white rounded-sm py-2 px-4 focus:outline-0 text-black w-full'/>
                </div>
                <div className='flex gap-2'>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={()=>navigate('/home')}>Home</div>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 hidden md:block' onClick={()=>navigate('/about')}>About</div>
                    <div className='text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-500 ' onClick={()=>navigate('/login')}>Login</div>
                </div>
            </div>

        </div>
    )
}

export default Header