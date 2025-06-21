import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerHome = () => {
  const [items, setItems] = useState([]);
  const [partnerDetails, setPartnerDetails] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [itemsResponse, profileResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/partners/items`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/partners/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (itemsResponse.status === 200) setItems(itemsResponse.data.items || []);
        if (profileResponse.status === 200) setPartnerDetails(profileResponse.data || {});
      } catch (error) {
        console.error('Error fetching partner data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newItem = { name, price, photo };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/partners/add-item`,
        newItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        setItems((prev) => [...prev, response.data.item]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setName('');
    setPrice('');
    setPhoto('');
  };

  const toggleAvailability = async (itemId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/partners/toggle-item/${itemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === itemId ? { ...item, available: response.data.available } : item
          )
        );
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/partner-login');
  };

  const handleBack = () => {
    navigate('/partner-home1');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <p className="text-gray-500 text-lg">Loading partner profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center">
          <img
            className="w-16"
            src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
            alt="Logo"
          />
          <h1 className="text-xl font-bold text-gray-800">
            {partnerDetails?.fullname?.firstname || 'Partner'}{' '}
            {partnerDetails?.fullname?.lastname || ''}
          </h1>
          <p className="text-sm text-gray-500">{partnerDetails?.email || 'email@example.com'}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Item</h2>
        <form onSubmit={submitHandler} className="flex flex-wrap gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Food Name"
            className="border px-4 py-2 rounded w-full sm:w-[30%]"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border px-4 py-2 rounded w-full sm:w-[30%]"
          />
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Photo URL"
            className="border px-4 py-2 rounded w-full sm:w-[30%]"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Inventory</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Photo</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Toggle</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className={item.available ? 'bg-white' : 'bg-gray-100'}>
                    <td className="px-4 py-2 border">
                      <img
                        src={item.photo || 'https://via.placeholder.com/50'}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">₹{item.price}</td>
                    <td className="px-4 py-2 border">{item.available ? 'Available' : 'Unavailable'}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => toggleAvailability(item._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerHome;
