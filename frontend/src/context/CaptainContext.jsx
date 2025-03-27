import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();



// export const UseCaptain=()=>{
//     const context=useContext(CaptainContext);
//     if(!context){
//         throw new Error('CaptainContext must be used within a CaptainContext Provider');
//     } 
//     return context;
// }
const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;