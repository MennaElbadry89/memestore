

export default function Promo() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-5 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="text-md mt-4 text-gray-500 md:text-xl">
              This year, our new collection will shelter you from the harsh elements of a world that doesn't care
              if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-20 md:mt-10">
              {/* Decorative image grid */}
              <div  aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    
                    <div className="grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                      
                      <div className="w-22 h-32 overflow-hidden rounded-lg sm:opacity-0 md:h-64 md:w-44 lg:opacity-100">
                        <img  alt=""  src="/image/7.jpg" className="size-full object-cover" />
                      </div>
                      
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img  alt=""  src="/image/39.jpg"  className="size-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                     
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img alt="" src="/image/21.jpg"  className="size-full object-cover"  />
                      </div>
                      
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img  alt="" src="/image/26.jpg"  className="size-full object-cover" />
                      </div>
                      
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img   alt="" src="/image/50.jpg"  className="size-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                     
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img  alt=""   src="/image/5.jpg"  className="size-full object-cover" />
                      </div>
                      
                      <div className="w-22 h-32 overflow-hidden rounded-lg md:h-64 md:w-44">
                        <img alt=""  src="/image/29.jpg"   className="size-full object-cover"  />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <a  href="/shop" className="inline-block animate-pulse rounded-2xl bg-gray-800 p-2 text-center text-sm font-medium text-white hover:animate-none" >
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
