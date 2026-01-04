import Header from '../../Components/Header/Header'
import Contact from '../Contact/Contact'
import Categories from '../Shop/Categories'
import NewArrival from '../Shop/NewArrival'
import CustomersPurchase from '../Shop/CustomersPurchase'
import Deals from '../Shop/Deals'
import Promo from '../Shop/Promo'
import './Home.css'
import LottiHandeler from '../../assets/lottifiles/LottiHandeler'

function Home() {
  return (
    <div className='Home'>
      <Header/>
      <Categories/>
      <Promo/>
      <NewArrival/>
      <CustomersPurchase/>
      <Deals/>
      
      
      {/* <Contact/> */}
    </div>
  )
}

export default Home