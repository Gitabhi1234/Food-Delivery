import React from 'react'

const WatingForPartner = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setAcceptedOrderPanel(false);
        }}
        className="absolute top-0 text-center  w-[93%]"
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex items-center justify-between ">
          <img
            className="h-20"
            src="https://cdn-icons-png.flaticon.com/128/2533/2533721.png"
            alt=" Partner image"
          />
          <div className='flex flex-col  text-right'>
            <h2 className='text-lg font-medium'>Abhijeet</h2>
            <h3 className='text-xl font-semibold w-full flex-wrap items-center flex'>1289759<h3 className='text-xl font-bold'>9710</h3></h3>
            <h2 className='text-sm font-medium text-gray-300'>Shiddhivinayak</h2>
          </div>
        </div>
      <div className="flex justify-center gap-2  items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex gap-5 items-center p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-line"></i>
            <div className="flex flex-col">
              <h3 className="font-bold">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Hotel Chhava, Chhatrapati Sambhaji Maharaj Nagar
              </p>
            </div>
          </div>
          <div></div>
          <div className="flex gap-5 items-center p-3 ">
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div className="flex gap-2">
              <h3 className="font-semibold">Price :- </h3>
              <h2> 119.00/-</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatingForPartner
