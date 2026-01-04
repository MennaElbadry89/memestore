import Team from '../Team/Team'
import './About.css'

function Company() {
  return (
    <>
    <div className='Company flex flex-col' >
     <div className='flex flex-col md:flex-row'>
       <div className='w-full md:w-1/2'>
        <img src="/image/melogo.jpg" alt="" />
       </div>
        <div className="about flex w-full flex-col gap-5 p-10 md:w-1/2">
        <p className='indent-10 text-2xl max-md:text-lg'>Since our launch in 2021, we have been committed to providing the best shopping experience in footwear, bags, and clothing. We focus on offering high-quality products at affordable prices, with a wide range of styles to suit every taste—whether you prefer classic essentials or the latest fashion trends.</p>
        <p className='indent-10 text-2xl max-md:text-lg'>We provide shipping to any location, ensuring your orders arrive quickly and safely. We also offer both wholesale and retail options to meet the needs of individual customers as well as business owners.</p>
        <p className='indent-10 text-2xl max-md:text-lg'>Our goal is to deliver reliable products and exceptional customer service, making your shopping journey smooth and enjoyable.</p>
         <button className= 'w-max animate-pulse cursor-pointer rounded-2xl bg-gray-900 px-7 py-2 text-white hover:bg-gray-600'><a href="/shop">Shop Now</a> </button>
      </div>
     </div>
     <Team />
    </div>
    </>
  )
}

export default Company