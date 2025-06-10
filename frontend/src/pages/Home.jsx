import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import CartPanel from '../components/CartPanel';
import ConfirmOrder from '../components/ConfirmOrder';
import LookingForPartnerAcceptance from '../components/LookingForPartnerAcceptance';
import WatingForPartner from '../components/WatingForPartner';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const [cartPanelOpen,setCartPanelOpen]=useState(false)
  const [confirmOrderPanel,setConfirmOrderPanel]=useState(false)
  const [acceptedOrderPanel,setAcceptedOrderPanel]=useState(false)

  const cartPanelRef=useRef(null)
  const confirmOrderPanelRef=useRef(null)
  const acceptedOrderPanelRef=useRef(null)
  const panelRef=useRef(null)
  const panelCloseRef=useRef(null)
   const submitHandler=(e)=>{
    e.preventDefault();
   }
   useGSAP(function () {
     if (panelopen) {
       gsap.to(panelRef.current, {
         height: "75%",
         padding:24
         //opacity: 1,
       })
       gsap.to(panelCloseRef.current, {
         opacity: 1,
      })
      }
      else{
        gsap.to(panelRef.current, {
          height: "0%",
          padding:0
          //opacity: 0,
        })
        gsap.to(panelCloseRef.current, {
         opacity: 0,

       })
      }
    
     
   },[panelopen])
   useGSAP(function () {
      if(confirmOrderPanel){
         gsap.to(confirmOrderPanelRef.current, {
          transform:'translateY(0)'
       })
      }
      else{
        gsap.to(confirmOrderPanelRef.current, {
          transform:'translateY(100%)'
       })
      }
   },[confirmOrderPanel])
   useGSAP(function () {
      if(cartPanelOpen){
         gsap.to(cartPanelRef.current, {
          transform:'translateY(0)'
       })
      }
      else{
        gsap.to(cartPanelRef.current, {
          transform:'translateY(100%)'
       })
      }
   },[cartPanelOpen])
     useGSAP(function () {
      if(acceptedOrderPanel){
         gsap.to(acceptedOrderPanelRef.current, {
          transform:'translateY(0)'
       })
      }
      else{
        gsap.to(acceptedOrderPanelRef.current, {
          transform:'translateY(100%)'
       })
      }
   },[acceptedOrderPanel])
  return ( 
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 ml-8 inset-0 top-5 absolute"
        src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
        alt=""
      />
      <div  className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://developers.google.com/static/maps/documentation/mobility/operations/images/fleet_tracking_example.png?hl=vi"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full  ">
        <div className="h-[25%] p-6 bg-white relative pb-20">
          <h5 ref={panelCloseRef} onClick={()=>
                setPanelopen(false)
              }  
              className="absolute top-3 opacity-0 right-2 text-2xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-3xl font-semibold">Choose your location</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <input
              onClick={()=>
                setPanelopen(true)
              }
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-5  py-2 text-base w-full rounded-lg mt-5"
              type="text"
              placeholder="Add a Pickup Loacation"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white  h-0">
              <LocationSearchPanel setPanelopen={setPanelopen} setCartPanelOpen={setCartPanelOpen} />
        </div>

      </div>
      <div ref={cartPanelRef} className='fixed z-10 bottom-0 px-3 py-10 translate-y-full bg-white w-full ' >
          <CartPanel setConfirmOrderPanel={setConfirmOrderPanel} setCartPanelOpen={setCartPanelOpen}/>
      </div>
      <div ref={confirmOrderPanelRef} className='fixed z-10 bottom-0 px-3 py-6 translate-y-full bg-white w-full ' >
          <ConfirmOrder setConfirmOrderPanel={setConfirmOrderPanel} setAcceptedOrderPanel={setAcceptedOrderPanel}/>
      </div>
      <div ref={acceptedOrderPanelRef} className='fixed z-10 bottom-0 px-3 py-6 translate-y-full bg-white w-full ' >
          <LookingForPartnerAcceptance setAcceptedOrderPanel={setAcceptedOrderPanel}/>
      </div>
      <div  className='fixed z-10 bottom-0 px-3 py-6  bg-white w-full ' >
          <WatingForPartner/>
      </div>
    </div>
  );
}

export default Home
