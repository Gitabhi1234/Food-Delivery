import React from 'react'

const CartPanel = (props) => {
  return (
    <div>
          <h5 onClick={()=>
               props.setCartPanelOpen(false)
              }  
              className="absolute top-3 text-center p-3 w-[93%]"><i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
         
              <h3 className='font-semibold mb-5 text-2xl'>Cart:</h3>
              <div className='flex gap-2 h-14 justify-between mb-2 items-center rounded-xl p-3 border-2 border-black w-full'> 
                <i className="font-semibold  ri-shopping-cart-line"></i>
                 <h4 className='w-full'>cart info goes here</h4>
              </div>
              <div className='flex gap-2 h-14 justify-between mb-2 items-center rounded-xl p-3 border-2 border-black w-full'> 
                <i className="font-semibold  ri-shopping-cart-line"></i>
                 <h4 className='w-full'>cart info goes here</h4>
              </div>
              <div onClick={()=>{
                props.setConfirmOrderPanel(true)
              }} className='flex h-14 mb-2 items-center justify-center rounded-xl p-3 w-full'> 
                <button className='bg-blue-500 font-semibold text-lg border-2 rounded-lg w-full h-full border-black '>Procced To Confirm</button>
              </div>
    </div>
  )
}

export default CartPanel
