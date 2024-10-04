// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SERVER_URL = 'https://blog-app-backend-upforcetech.onrender.com';

export interface User {
  id: string;
  name: string;
  email: string;
  // Add any other fields you need
}

// Async action to log in a user
export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  'user/login',
  async ({ email, password }) => {
    const response = await axios.post(`${SERVER_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
);
const navigate = useNavigate()

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('state :>> ', state);
        state.loading = false;
        state.user = action.payload;
        toast.success('Login successful!'); // Show success toast
        navigate('/blog')

      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to log in';
        toast.error(state.error); // Show error toast
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
