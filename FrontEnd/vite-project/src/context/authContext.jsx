// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
// Adjust the import based on your module support
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        }
    }, []);

    const verifyToken = (token) => {
        try {
            const decoded = jwtDecode(token); // Use the correct decoding method
            console.log(decoded.foo); // Replace with actual payload fields
            setUser(decoded);
        } catch (err) {
            console.error('Token decoding failed:', err);
            setUser(null); // Clear user if token is invalid
        }
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        verifyToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

