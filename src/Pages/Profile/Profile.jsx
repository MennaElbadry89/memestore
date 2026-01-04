import './Profile.css'
import LottiHandeler from '../../assets/lottifiles/LottiHandeler';
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../features/auth/firebase";

function Profil() {
const { user } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState({});
  const [role, setRole] = useState("user")

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPhone(docSnap.data().phone);
          setCountry(docSnap.data().country);
          setRole(docSnap.data().role);
        }
      };
      fetchData();
    }
  }, [user]);

  if (!user) return <LottiHandeler/>;
  
  return (
    <div className='Profil m-10 flex flex-col items-center gap-5'>
      <h2 className='mb-5 text-center text-2xl'>your profile</h2>
      <div className='flex flex-col items-center justify-center gap-5 md:flex-row' >
        <div className='h-1/6 w-1/6'>
           <img src={user.photoURL} className='h-full w-full rounded' alt={user.displayName} />        
        </div>
        <div className='flex flex-col gap-5'>
              <p className='flex md:text-2xl'>Name:  <strong className='text-gray-600'>{user.displayName}</strong></p>
              <p className='flex md:text-2xl'>E-mail:  <strong className='text-gray-600'>{user.email}</strong></p>
              <p className='flex md:text-2xl'>Phone:  <strong className='text-gray-600'>{phone}</strong></p>
              <p className='flex md:text-2xl'>Role:  <strong className='text-gray-600'>{role}</strong></p>
              <div className='flex items-center gap-5'>
                  <p className='flex md:text-2xl'>Country:  <strong className='text-gray-600'>{country.name}</strong></p>
                  <img src={country.flag} className='h-10 w-12' alt="" />
              </div>
        </div>
      </div>      
    </div>
  )
}

export default Profil