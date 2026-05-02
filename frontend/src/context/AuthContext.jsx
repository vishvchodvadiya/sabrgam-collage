import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
            axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const register = async (userData) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
