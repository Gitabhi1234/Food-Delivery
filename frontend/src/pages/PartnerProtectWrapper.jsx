import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerDataContext from '../context/PartnerDataContext';
import axios from 'axios';

const PartnerProtectWrapper = ({ children }) => {
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { partner,setPartner } = React.useContext(PartnerDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/partner-login');
    }
  }, [token, navigate]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/partners/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response=>{
    if(response.status===200){
      const data = response.data;
      setPartner(data.partner);
      setIsLoading(false);
    }
  })
  .catch(error => {
    console.error('Error fetching partner profile:', error);
    localStorage.removeItem('token');
    navigate('/partner-login');
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PartnerProtectWrapper;