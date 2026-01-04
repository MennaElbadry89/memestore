import './Team.css'
import { FaSquareFacebook  } from "react-icons/fa6";
import { FaInstagram  } from "react-icons/fa6";
// import { BsFillHandbagFill } from "react-icons/bs";
// import { PiHighHeelThin } from "react-icons/pi";

import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const person = [
  {
    id: 1,
    name: 'Menna Elbadry',
    Role: 'Owner',
    imageSrc: '/image/team2.jpg',
    imageAlt: 'image of young woman.',
  },
   {
    id: 1,
    name: 'Muhammad Elbadry',
    Role: 'Owner',
    imageSrc: '/image/team1.jpg',
    imageAlt: 'image of young man.',
  },
     {
    id: 1,
    name: 'Elbadry Shaaban',
    Role: 'Owner',
    imageSrc: '/image/team3.jpg',
    imageAlt: 'image of young man.',
  },
]

const qout = [
  {
    id: 1,
    name: 'rev1',
    imageSrc: '/image/rev1.jpg',
  },
   {
    id: 2,
    name: 'rev2',
    imageSrc: '/image/rev2.jpg',
  },
     {
    id: 3,
    name: 'rev3',
    imageSrc: '/image/rev3.jpg',
  },
  {
    id: 4,
    name: 'rev4',
    imageSrc: '/image/rev4.jpg',
  },
   {
    id: 5,
    name: 'rev5',
    imageSrc: '/image/rev5.jpg',
  },
     {
    id: 6,
    name: 'rev6',
    imageSrc: '/image/rev6.jpg',
  },
  {
    id: 7,
    name: 'rev7',
    imageSrc: '/image/rev7.jpg',
  },
   {
    id: 8,
    name: 'rev8',
    imageSrc: '/image/rev8.jpg',
  },
     {
    id: 9,
    name: 'rev9',
    imageSrc: '/image/rev9.jpg',
  },
  {
    id: 10,
    name: 'rev10',
    imageSrc: '/image/rev10.jpg',
  },
   {
    id: 11,
    name: 'rev11',
    imageSrc: '/image/rev11.jpg',
  },
     {
    id: 12,
    name: 'rev12',
    imageSrc: '/image/rev12.jpg',
  },
  {
    id: 13,
    name: 'rev13',
    imageSrc: '/image/rev13.jpg',
  },
   {
    id: 14,
    name: 'rev14',
    imageSrc: '/image/rev14.jpg',
  },
     {
    id: 15,
    name: 'rev15',
    imageSrc: '/image/rev15.jpg',
  },
  {
    id: 16,
    name: 'rev16',
    imageSrc: '/image/rev16.jpg',
  },
   {
    id: 17,
    name: 'rev17',
    imageSrc: '/image/rev17.jpg',
  },
     {
    id: 18,
    name: 'rev18',
    imageSrc: '/image/rev18.jpg',
  },
  {
    id: 19,
    name: 'rev19',
    imageSrc: '/image/rev19.jpg',
  },
   {
    id: 20,
    name: 'rev20',
    imageSrc: '/image/rev20.jpg',
  },
    
]

function Team() {
 
  return (
    <div className='Team mx-auto max-w-2xl px-4 py-16 max-md:mx-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
     
    <div className="bg-white">
      <div className="">
        <h2 className="text-xl text-gray-600 md:text-4xl">Our Team:</h2>
        <p className='my-10 indent-20 text-xl md:text-2xl'>We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {person.map((person) => (
            <div key={person.id} className="group">
              <img  alt={person.imageAlt} src={person.imageSrc}
                className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"  />
              <h3 className="mt-4 text-sm text-gray-900">{person.name}</h3>
              <p className="my-1 text-lg font-medium text-gray-700">{person.Role}</p>
              <div className='flex items-center gap-3 text-xl text-gray-500'>
                <a href=""   className=''> <FaSquareFacebook /></a>
                <a href=""   className=''> <FaInstagram /></a> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


         
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mb-10 text-xl text-gray-700 md:text-4xl">What they said about memeStore :-</h2>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 1000, disableOnInteraction: true }}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {qout.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group rounded-xl border border-gray-300">
                <img
                  alt={item.name}
                  src={item.imageSrc}
                  className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <h3 className="mt-4 text-sm text-gray-900">{item.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
    </div>
  )
}

export default Team