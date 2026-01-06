import Cat from "./Cat"

function Header() {
  return (
    <>
    <div className='Header h-100 relative overflow-hidden'>

    <div className='flex h-full w-full items-center justify-center overflow-hidden'>
      <img src="/image/107076755-beautiful-young-women-with-shopping-bags-on-city-street.jpg" className='w-full' alt="" />
    </div>
    <div className='absolute inset-0 flex w-full flex-col items-center justify-center bg-black/60'>
    <div className="mx-10 flex flex-col items-start justify-center md:mx-auto">
      <p className="text-md m-2 font-bold text-white md:text-2xl">Trendy Shoes, Stylish Bags & Fresh Outfits - All in One Place.</p>
      <p className="text-md m-2 font-bold text-white md:text-2xl">Style Made for You.</p>
     <a className="m-2 w-auto animate-pulse cursor-pointer rounded-2xl bg-gray-900 p-2 text-center text-white" href="/shop"> shop now</a>

    </div>
    </div>
    </div>
    
    <Cat/>
    </>
  )
}

export default Header