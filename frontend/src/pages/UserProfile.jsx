import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {}, // Empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUserDetails(response.data);
          setOrders(response.data.orders || []); // Set orders from the response
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>

      {/* Profile Details */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
        <p>
          <strong>Name:</strong> {userDetails?.fullname?.firstname || 'N/A'} {userDetails?.fullname?.lastname || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {userDetails?.email || 'N/A'}
        </p>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="border p-4 rounded mb-4 bg-gray-100">
              <p >
                <strong >Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <h3 className="font-semibold mt-2">Items:</h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="ml-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-32 h-32 object-cover mt-2"
                  />
                  <p>
                    <strong>Item Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;