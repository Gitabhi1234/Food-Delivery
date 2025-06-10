import React from 'react'

const LocationSearchPanel = (props) => {
const locations=[
  "Room-315,Nutan College,Talegaon Dabhade,Pune",
  "Sec-26 near Petrol Morya Petrol Pump,Pooja Classic Apartment,Pune",
  "Sec-27 near abhi's Cafe ,Pooja Classic Apartment,Pune",
  "22B,  near kapoors's Cafe ,Pooja Classic Apartment,Pune",
  "18A, near Dehuroad  ,Pooja Classic Apartment,Pune",
]

  return (
    <div>
      {/* this is only sample data we have to change and add more*/}
      {
        locations.map(function(el,indx){
         return <div key={indx} onClick={()=>{
           props.setCartPanelOpen(true)
           props.setPanelopen(false)
         }} className='flex border-2 p-3 rounded-xl border-grey-50 active:border-black items-center my-2 gap-4'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{el}</h4>
      </div>
        })
      }

      
    </div>
  )
}

export default LocationSearchPanel
