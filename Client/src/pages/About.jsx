import React from 'react'

function About() {
  return (
    <div className='flex justify-center mt-20 mb-20'>
      <div className='w-full xl:min-w-[1200px] xl:max-w-[1200px]'>
        <div className='text-3xl font-bold text-slate-800 mb-5'>About Sufyan Estate</div>
        <div className='flex flex-col gap-y-4 text-slate-700'>
            <span>
                Sufyan Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
            </span>
            <span>
              Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
            </span>
            <span>
              Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
            </span>
        </div>
        </div>
    </div>
  )
}

export default About