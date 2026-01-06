import './Navbar.css'
'use client'

import { FaRegHeart } from "react-icons/fa";
import { Fragment, useState } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Dialog, DialogBackdrop , DialogPanel, Popover, PopoverButton,
    PopoverGroup,  PopoverPanel,  Tab,  TabGroup,  TabList,  TabPanel,
    TabPanels,} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from "../../features/auth/authSlice"; 
import CartFlying from "../../Pages/Cart/CartFlying"
// import { removeFromCart, clearCart,  increaseQuantity, decreaseQuantity,  } from "../../features/cart/cartSlice";
import Swal from 'sweetalert2'


const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Collections',
      featured: [
        {
          name: 'New Arrivals',
          href: '#new',
          imageSrc: 'image/17.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Best sale',
          href: '#deals',
          imageSrc: 'image/26.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Customers purchased',
          href: '#customers',
          imageSrc: 'image/5.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },      ],
      sections: [
        {
          id: 'Collections',
          name: 'Collections',
          items: [
            { name: 'Clothes', href: '/clothes' },
            { name: 'Shoes', href: '/shoes' },
            { name: 'Bage', href: '/bags' },
            { name: 'Browse All', href: '/shop' },
          ],
        },
        // {
        //   id: 'brands',
        //   name: 'Brands',
        //   items: [
        //     { name: 'Re-Arranged', href: '#' },
        //     { name: 'Counterfeit', href: '#' },
        //     { name: 'Full Nelson', href: '#' },
        //     { name: 'My Way', href: '#' },
        //   ],
        // },
      ],
    },
   
  ],
  pages: [
    { name: 'Company', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Navbar() {

  const [show , setShow] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [op, setOp] = useState(false)  // logout modal
  
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/"); 
    setOp(!op);
  };
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  
  const { user } = useSelector((state) => state.auth); 
  const { totalQuantity } = useSelector((state) => state.cart)
  const { totalCount } = useSelector((state) => state.wishlist)
  const navigate = useNavigate()
  
 const handleShowCart = () => {
  if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login required",
          text: "you must login to see cart ",
          confirmButtonText: "login",
          showCancelButton: true,
          }).then((result) => {
             if (result.isConfirmed) {
                navigate("/login");
              }
          });
        return;
      }else{
        navigate('/cart')
      }
  };
 const handleShowWishlist = () => {
  if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login required",
          text: "you must login to see cart ",
          confirmButtonText: "login",
          showCancelButton: true,
          }).then((result) => {
             if (result.isConfirmed) {
                navigate("/login");
              }
          });
        return;
      }else{
        navigate('/wishlist')
      }
  };
 
  
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="data-closed:opacity-0 fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="data-closed:-translate-x-full relative flex w-full max-w-xs transform flex-col bg-white pb-12 shadow-xl transition duration-300 ease-in-out">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="data-selected:border-indigo-600 data-selected:text-indigo-600 flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900" >{category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid w-full grid-cols-3 gap-1">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative w-full text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="h-32 w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1"> Shop now</p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6" >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

           {(!user)?( <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="/login" className="-m-2 block p-2 font-medium text-gray-900"> Sign in </a>
              </div>
              <div className="flow-root">
                <a href="/register" className="-m-2 block p-2 font-medium text-gray-900">Create account</a>
              </div>
            </div>): ( <div className="flex flex-col space-y-6 border-t border-gray-200 px-4 py-6 lg:hidden">
              <div 
                className="flex items-center gap-2 text-gray-700 hover:text-gray-800 focus:outline-none">
                <span className="text-md ml-3 block font-bold">{user?.displayName}</span>
               {user.photoURL?( <img src={user.photoURL}
                  className="h-10 w-10 rounded-full" alt="User avatar"/>):""}
              </div>          
              <div className="flex flex-col">
                <button  onClick={() => {navigate("/profile")}}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" > Profile </button>
                <button
                  onClick={() => {navigate("/orders")}}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" >Orders </button>
                <button  onClick={() =>{setOp(!op); setOpenn(!openn)} }
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Logout  </button>
              </div>
              
              </div>)} 


          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 animate-pulse items-center justify-center bg-gray-900 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="/image/melogo.jpg" className="w-15 h-15 rounded-full"/>
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="data-open:text-indigo-600 group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800">
                          {category.name}
                          <span aria-hidden="true" className="group-data-open:bg-indigo-600 absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out"/>
                        </PopoverButton>
                      </div>
                      <PopoverPanel  transition
                        className="data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition">
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-3 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img alt={item.imageAlt} src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />{item.name}</a>
                                    <p aria-hidden="true" className="mt-1">Shop now</p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">{section.name}</p>
                                    <ul role="list" aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-gray-800">{item.name}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a key={page.name} href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{page.name}</a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div>
                {(!user)?(
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">                  
                  <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800"> Create account</a>
                </div> ) : (<span className="hidden text-sm font-medium text-gray-700 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">welcome </span>) }
                </div>

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a href="/profile" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img src={user?.image ? `http://127.0.0.1:8000/storage/${user.image}` : "/default-avatar.png"} 
                         className="block h-auto w-10 shrink-0 rounded-full" />
                       <span className="ml-3 block text-sm font-medium"> {user ? user.name : "Guest"}</span>
                   </a>
                </div> */}
                
    { user &&( <div className="relative hidden lg:flex">
      <button  onClick={() => setOpenn(!openn)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-800 focus:outline-none">
        <span className="ml-3 block text-sm font-medium">{user ? user.displayName : "Guest"}</span>
       {user.photoURL?( <img src={user.photoURL}
          className="h-10 w-10 rounded-full" alt="User avatar"/>):""}
      </button>

      {openn && (
        <div className="absolute right-0 top-11 z-50 w-48 rounded-md bg-white shadow-lg">
          <button  onClick={() => {navigate("/profile"); setOpenn(!openn)}}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" > Profile </button>
          <button
            onClick={() => {navigate("/orders"); setOpenn(!openn)}}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" >Orders </button>
          <button  onClick={() =>{setOp(!op); setOpenn(!openn)} }
            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100">Logout  </button>
        </div>
        )}
        </div>)}        
                                   {/* logout modal */}   
   {op && ( 
    <div className='fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black/50'>
      <div className='absolute z-50 flex h-1/4 w-1/4 flex-col items-center justify-center bg-white max-md:w-2/3'>
        <p className='my-2 text-center'>Are you sure to leave?!</p>
        <div className='flex items-center justify-center gap-2'> 
          <button onClick={() =>setOp(!op)}  className='cursor-pointer rounded-xl bg-blue-500 p-2 text-white max-md:text-sm'>Cancel</button>
          <button onClick={handleLogout}  className='cursor-pointer rounded-xl bg-red-500 p-2 text-white max-md:text-sm'>Logout</button>
        </div>
      
    </div>
    </div>    
   )}
   
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="/search" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </a>
                </div>
                
               {/* Wishlist */}
                <div className="relative ml-4 flow-root lg:ml-6"  >      
                  <button onClick={handleShowWishlist}  className="group -m-2 flex cursor-pointer items-center p-2">
                    <FaRegHeart aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"/>
                   {user? (<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalCount}</span>
                    ):""}
                  </button>
                </div>

                {/* Cart */}
                <div className="relative ml-4 flow-root lg:ml-6"  onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>      
                  <button onClick={handleShowCart}  className="group -m-2 flex cursor-pointer items-center p-2">
                    <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"/>
                   {user? (<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalQuantity}</span>
                    ):""}
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                {show && 
                (user? (<div className='absolute -right-10 top-full z-50 border border-gray-200'><CartFlying /></div>):
                <div className='absolute right-0 top-full z-50 w-[150px] rounded-md bg-gray-600 p-1 text-center text-white'><a href="/login">Login to view cart</a> </div>)}                  
                </div>
                
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
