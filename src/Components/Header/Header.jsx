import Cat from "./Cat"

function Header() {
  return (
    <>
    <div className='Header h-100 relative overflow-hidden'>

    <div className='flex h-full w-full items-center justify-center overflow-hidden'>
      <img src="/image/107076755-beautiful-young-women-with-shopping-bags-on-city-street.jpg" className='w-full' alt="" />
    </div>
    <div className='absolute inset-0 flex w-full flex-col items-center justify-center bg-black/60'>
    <div className="flex flex-col">
      <p className="m-2 text-2xl font-bold text-white max-md:text-xl">Trendy Shoes, Stylish Bags & Fresh Outfits — All in One Place.</p>
      <p className="m-2 text-2xl font-bold text-white max-md:text-xl">Style Made for You.</p>
     <a className="btn m-2 w-1/5 animate-pulse cursor-pointer rounded-2xl bg-gray-900 p-2 text-center text-white" href="/shop"> shop now</a>

    </div>
    </div>
    </div>
    
    <Cat/>
    </>
  )
}

export default Header