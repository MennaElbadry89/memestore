// import './Layout.css'
import Navbar from '../Common/Navbar/Navbar'
import Footer from '../Common/Footer/Footer'
import ContactLinks from '../Pages/Contact/ContactLinks'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <div className='Layout playwrite-no-font relative'>
        <Navbar/>
        <Outlet/>        
        <ContactLinks/>
        <Footer/>
        
    </div>
  )
}

export default Layout