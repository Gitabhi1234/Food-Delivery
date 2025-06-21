import React, { useEffect } from 'react';
import axios from 'axios';

const LookingForPartnerAcceptance = ({
  setAcceptedOrderPanel,
  setRejectedOrderPanel,
  setLookingForAcceptancePanel,
  selectedLocation,
  totalPrice,
  orderId,
}) => {
  useEffect(() => {
  console.log("🟢 Polling for order:", orderId);
   const orderid=String(orderId);

  const token = localStorage.getItem("token");

  const pollOrderStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/status/${orderid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const status = response.data.status;
      console.log("🔄 Order status received:", status); // <- Add this

      if (status === "accepted") {
        alert("✅ Order accepted!");
        setLookingForAcceptancePanel(false);
      } else if (status === "rejected") {
        alert("❌ Order rejected.");
        setLookingForAcceptancePanel(false);
      } else {
        console.log("⌛ Still waiting...");
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  };

  const intervalId = setInterval(pollOrderStatus, 5000);
  return () => clearInterval(intervalId);
}, [orderId, setLookingForAcceptancePanel]);

  return (
    <div>
      <h5
        onClick={() => setLookingForAcceptancePanel(false)}
        className="absolute top-0 text-center w-[93%]"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold mb-5 p-3 text-2xl">
        Looking for confirmation from partner
      </h3>
      <div className="flex justify-center gap-2 items-center flex-col">
        <img
          className="h-32"
          src="https://cdn-icons-gif.flaticon.com/10282/10282564.gif"
          alt="Waiting for acceptance"
        />
        <div className="w-full mt-5">
          <div className="flex gap-5 items-center p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-line"></i>
            <div className="flex flex-col">
              <h3 className="font-bold">{selectedLocation}</h3>
              <p className="text-sm -mt-1 text-gray-600">{selectedLocation}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3">
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div className="flex gap-2">
              <h3 className="font-semibold">Price :- </h3>
              <h2>₹{totalPrice ? totalPrice.toFixed(2) : '0.00'}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForPartnerAcceptance;
