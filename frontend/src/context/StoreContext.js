
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);
    const [storeData, setStoreData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [stats, setStats] = useState(null);
    const url = 'https://abackend-7.onrender.com';

    
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${url}/api/users/me`);
            console.log(response.data.data)
            if (response.data.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadStoreData = async() => {
        try {
            const response = await axios.get(`${url}/api/stores/`);
            if (response.data.success) {
                setStoreData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadUserData = async() => {
        try {
            const response = await axios.get(`${url}/api/users/`);
            if (response.data.success) {
                setUserData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadStats = async() => {
        try {
            const response = await axios.get(`${url}/api/users/stats`);
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken('');
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            loadStoreData();
            if (user?.role === 'system_admin') {
                loadUserData();
                loadStats();
            }
        }
    }, [token, user]);

    return(
        <StoreContext.Provider value={{
            token, 
            setToken, 
            user,
            url, 
            storeData,
            userData,
            stats,
            logout,
            loadStoreData,
            loadUserData
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;