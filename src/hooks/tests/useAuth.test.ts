import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../useAuth';
import axios from 'axios';

// Mock axios for the API calls
jest.mock('axios');

// Mock localStorage
beforeEach(() => {
    localStorage.clear();
});

describe('useAuth hook', () => {
    it('should initialize with no user and null token', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it('should login a user successfully', async () => {
        const mockUser = { name: 'John Doe', id: 1 };
        const mockToken = 'mock-token';

        // Mock the axios POST and GET requests
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: { token: mockToken } });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUser });

        const { result } = renderHook(() => useAuth());

        // Trigger login
        await act(async () => {
            await result.current.login('john', 'password');
        });

        // Check if the user is logged in
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.token).toEqual(mockToken);
        expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });

    it('should set an error if login fails', async () => {
        const mockError = 'Failed to authenticate';

        // Mock axios POST to reject
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error(mockError));

        const { result } = renderHook(() => useAuth());

        // Trigger login
        await act(async () => {
            await result.current.login('wrongUser', 'wrongPassword');
        });

        // Check if error is set
        expect(result.current.error).toBe(mockError);
    });

    it('should logout the user successfully', async () => {
        const mockToken = 'mock-token';

        // Mock token in localStorage
        localStorage.setItem('auth_token', mockToken);

        const { result } = renderHook(() => useAuth());

        // Trigger logout
        act(() => {
            result.current.logout();
        });

        // Check if user is logged out
        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('should handle loading state during login', async () => {
        const mockUser = { name: 'John Doe', id: 1 };
        const mockToken = 'mock-token';

        // Mock the axios POST and GET requests
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: { token: mockToken } });
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockUser });

        const { result, waitForNextUpdate } = renderHook(() => useAuth());

        // Trigger login
        act(() => {
            result.current.login('john', 'password');
        });

        // Wait for the update after login
        await waitForNextUpdate();

        // Check if loading state works
        expect(result.current.loading).toBeFalsy();
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.token).toEqual(mockToken);
    });
});
