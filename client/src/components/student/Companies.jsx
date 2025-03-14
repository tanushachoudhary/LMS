import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
     <p className='text-xl text-gray-500 mt-36'>Trusted by learners from</p>
     <div className='flex flex-wrap justify-center items-center gap-6 md:gap-16 md:mt-10 mt-5'>
      <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28'/>
      <img src={assets.walmart_logo} alt="walmart" className='w-20 md:w-28'/>
      <img src={assets.accenture_logo} alt="accenture" className='w-20 md:w-28'/>
      <img src={assets.adobe_logo} alt="adobe" className='w-20 md:w-28'/>
      <img src={assets.paypal_logo} alt="paypal" className='w-20 md:w-28'/>
     </div>
    </div>
  )
}

export default Companies
