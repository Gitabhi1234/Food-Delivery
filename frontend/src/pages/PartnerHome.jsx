import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerHome = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/partners/items`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setItems(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newItem = { name, price, photo };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/partners/add-item`,
        newItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        setItems(prev => [...prev, response.data.item]);
        navigate("/partner-home");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
    setName('');
    setPrice('');
    setPhoto('');
  };

  const toggleAvailability = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/partners/toggle-item/${itemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setItems(prev => prev.map(item => item._id === itemId ? { ...item, available: response.data.available } : item));
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <div className="p-7 relative">
      <img
        className="w-16 ml-2 pb-7"
        src="https://cdn-icons-png.flaticon.com/128/3063/3063822.png"
        alt=""
      />
      <h1 className="text-2xl font-bold mb-5">Food Inventory Management</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Food Name"
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Photo URL"
            className="border px-3 py-2 rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Item
          </button>
        </div>
      </form>
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Logo</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className={item.available ? "bg-white" : "bg-gray-200"}>
                <td className="px-4 py-2 border">
                  <img
                    src={item.photo || 'https://via.placeholder.com/50'}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">₹{item.price}</td>
                <td className="px-4 py-2 border">{item.available ? 'Available' : 'Unavailable'}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => toggleAvailability(item._id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PartnerHome;
