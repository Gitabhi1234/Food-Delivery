import { useState } from 'react';

import PartnerDataContext from './PartnerDataContext';

const PartnerContext = ({ children }) => {
    const [partner, setPartner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePartner = (partnerData) => {
        setPartner(partnerData);
    };

    const value = {
        partner,
        setPartner,
        isLoading,
        setIsLoading,
        error,
        setError,
        updatePartner
    };

    return (
        <PartnerDataContext.Provider value={value}>
            {children}
        </PartnerDataContext.Provider>
    );
};

export default PartnerContext;