import  './Lottifiles.css'
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import lotti1 from './loader.json'
import lotti2 from './ecommerce.json'
import sale from './Sale tags.json'
import cart from './ShoppingCartLoader.json'
import confirm from './Order Confirmed'
import Error from './ErrorAnimation.json'
import Err from './error.json'

export default function LottiHandeler({status}){

    switch (status){

        case 'main':
                return <div className="LottiHandeler mx-auto flex h-1/4 w-1/2 items-center justify-center" >
            <Lottie animationData={lotti1} />
                </div>
        case 'page' : 
                return <div className="LottiHandeler mx-auto flex h-1/4 w-1/2 items-center justify-center" >
                    <Lottie animationData={lotti2} />          
                </div>
        case 'sale' : 
                return <div className="LottiHandeler h-1/8 mx-auto flex w-full items-center justify-center" >
                    <Lottie animationData={sale} />          
                </div>
        case 'cart' : 
                return <div className="LottiHandeler mx-auto flex h-1/4 w-1/2 items-center justify-center" >
                    <Lottie animationData={cart} />          
                </div>
        case 'confirm' : 
                return <div className="LottiHandeler h-1/8 mx-auto flex w-full items-center justify-center" >
                    <Lottie animationData={confirm} />          
                </div>
        case 'Err' :
                return <div className="LottiHandeler mx-auto flex h-1/4 w-1/2 items-center justify-center" >
                    <Lottie animationData={Err} />          
                </div>
        default : 
                 return <div className="LottiHandeler mx-auto flex h-1/4 w-1/2 items-center justify-center" >
                    <Lottie animationData={Error} /> 
                    <p className='h3 text-danger'>Go back to Home</p>    
                    <Link to={"/"} className='h4 text-info'>Go back to Home</Link>     
                </div>


}} 