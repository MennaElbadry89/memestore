import { motion, stagger } from 'framer-motion';
import { FaCheck } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
export default function Cat(){

  const container = {
    hidden:{opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }
  const Item ={
    hidden: {opacity: 0, y: 100},
    show: {opacity: 1, y: 0 , transition:{duration: 0.5}},
  }

  return(
    <div className='mx-10 p-10'>

    <motion.div className="z-20 grid grid-cols-1 gap-2 md:grid-cols-2 md:p-5 lg:grid-cols-4" variants={container} initial="hidden" animate="show">

     <motion.div 
      variants={Item}
      className='w-full rounded border border-blue-300 p-2 text-center text-gray-700 shadow-xl hover:bg-blue-200 hover:text-white md:p-5 md:md:text-xl'>
        <div className='flex items-center justify-center gap-2'>
            <FaCheck />
            <span> Quality Product</span>
        </div>
      </motion.div>
  
      <motion.div 
      variants={Item}
      className='w-full rounded border border-blue-300 p-2 text-center text-gray-700 shadow-xl hover:bg-blue-200 hover:text-white md:p-5 md:md:text-xl'>
          <div className='flex items-center justify-center gap-2'>
              <RiTruckFill />
              <span>Free Shipping</span>
          </div>
      </motion.div>

      <motion.div 
      variants={Item}
      className='w-full rounded border border-blue-300 p-2 text-center text-gray-700 shadow-xl hover:bg-blue-200 hover:text-white md:p-5 md:md:text-xl'>
        <div className='flex items-center justify-center gap-2'>
            <FaCheck />
            <span>14-Day Return</span>
         </div>
      </motion.div>

      <motion.div 
      variants={Item}
      className='w-full rounded border border-blue-300 p-2 text-center text-gray-700 shadow-xl hover:bg-blue-200 hover:text-white md:p-5 md:md:text-xl'>
     <div className='flex items-center justify-center gap-2'>
        <RiTruckFill />
        <span>24/7 Support</span>
    </div>
      </motion.div>

</motion.div>
</div>


  )
}

 

