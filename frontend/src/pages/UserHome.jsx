import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartPanel from '../components/CartPanel';
import ConfirmOrder from '../components/ConfirmOrder';

const UserHome = () => {
  const [partners, setPartners] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [confirmOrderPanel, setConfirmOrderPanel] = useState(false);
  const [acceptedOrderPanel, setAcceptedOrderPanel] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const cartPanelRef = useRef(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/partners/all`
        );
        if (response.status === 200) {
          setPartners(response.data.partners);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/cart`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.status === 200) {
            setCartItems(response.data.cartItems);
            const newCartCount = response.data.cartItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            setCartCount(newCartCount);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please log in as a user to add items to the cart.");
        return;
      }

      const payload = {
        item: {
          itemId: item._id,
          name: item.name,
          price: item.price,
          photo: item.photo || '',
          quantity: 1
        }
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/cart/add`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setCartItems(response.data.cartItems);
        const newCartCount = response.data.cartItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0
        );
        setCartCount(newCartCount);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveItemFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter(item => item.itemId !== itemId);
      const newCartCount = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(newCartCount);
      return updatedCart;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative pb-20">
      <div
        ref={cartPanelRef}
        className={`fixed z-10 bottom-0 px-3 py-10 bg-white w-full transition-transform duration-300 ${cartPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <CartPanel 
          cartItems={cartItems}
          setCartPanelOpen={setCartPanelOpen}
          onRemove={handleRemoveItemFromCart}
        />
      </div>
      
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">Partner Items</h1>
        {partners.filter(partner => partner.items && partner.items.length > 0).length === 0 ? (
          <p className="text-center text-base">No partner items available.</p>
        ) : (
          partners.filter(partner => partner.items && partner.items.length > 0)
            .map((partner) => (
              <div 
                key={partner._id}
                className="mb-4 border p-4 rounded bg-white shadow"
              >
                <h2 className="text-lg font-semibold mb-2">
                   {partner.hotelname}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {partner.items.map((item) => (
                    <div 
                      key={item._id}
                      className="border rounded p-2 bg-gray-100 flex flex-col"
                    >
                      <img
                        src={item.photo || 'https://via.placeholder.com/100'}
                        alt={item.name}
                        className="w-full  h-30 object-cover rounded mb-1"
                      />
                      <h3 className="text-sm font-medium mb-0">{item.name}</h3>
                      <p className="text-gray-700 text-xs mb-0">₹{item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-auto">
                        {item.available ? 'Available' : 'Unavailable'}
                      </p>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="mt-2 flex items-center justify-center space-x-1 bg-green-400 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-2 shadow-inner">
        <div className="flex relative justify-evenly items-center bg-gray-100 rounded-lg p-2">
          <button
            onClick={() => setCartPanelOpen(true)}
            className="flex relative items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <div className="bg-white rounded-full p-1 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00.293 1.414l1.414 1.414a1 1 0 001.414-.293L12 13m0 0l3 6m-3-6L9 19" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>
          <Link to="user-profile"
            
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <div className="bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8.966 8.966 0 0112 16c2.21 0 4.21.713 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span>Profile</span>
          </Link>
        </div>
      </footer>
      {confirmOrderPanel && (
        <ConfirmOrder
          setConfirmOrderPanel={setConfirmOrderPanel}
          setAcceptedOrderPanel={setAcceptedOrderPanel}
          selectedLocation={selectedLocation}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default UserHome;