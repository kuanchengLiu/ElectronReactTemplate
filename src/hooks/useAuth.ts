import { useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextProps {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuth = (): AuthContextProps => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token') || null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if a token exists in localStorage and set the user accordingly
        if (token) {
            // You can optionally fetch user data based on the token
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get('/api/user', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    setError('Failed to fetch user data');
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [token]);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/login', { username, password });
            const { token } = response.data;

            // Save the token to localStorage
            localStorage.setItem('auth_token', token);
            setToken(token);

            // Optionally, fetch user data with the token
            const userResponse = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(userResponse.data);
        } catch (err) {
            setError('Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
    };

    return { user, token, loading, error, login, logout };
};

export default useAuth;
