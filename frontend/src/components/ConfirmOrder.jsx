import React from "react";

const ConfirmOrder = (props) => {
  return (
    <div>
      <h5
        onClick={() =>{ props.setConfirmOrderPanel(false)}}
        className="absolute top-0 text-center  w-[93%]"
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold mb-5 p-3 text-2xl">Confirm Your Order</h3>
      <div className="flex justify-center gap-2  items-center flex-col">
        <img
          className="h-24"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_aWDFShDagKlHGeUT87aKYCRp_hTWs1t_g&s"
          alt=" Food ready image"
        />
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

        <button
           onClick={() =>{ props.setAcceptedOrderPanel(true)}}
          className="bg-orange-300 mt-5 p-2 font-bold text-lg text-white border-2 rounded-xl w-full h-full border-black "
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
