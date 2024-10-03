import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../user/userSlice';
import { toast } from 'react-toastify';

// Define the Blog type
interface Blog {
    id: string;
    title: string;
    content: string;
}

// Define the initial state type
interface BlogState {
    blogs: Blog[];
    loading: boolean;
    error: string | null;
}

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});

// Request interceptor to add the Bearer token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 403) {
            toast.error('Access token is required');
        }
        return Promise.reject(error);
    }
);

// Async thunk to fetch blogs
export const fetchBlogs:any = createAsyncThunk<Blog[]>('blogs/fetchBlogs', async () => {
    const response = await axiosInstance.get('/getAllArticlesOfLoggedInUser');
    return response.data;
});

// Async thunk to add a blog
export const addBlog:any  = createAsyncThunk<Blog, Blog>('blogs/addBlog', async (blogData) => {
    const response = await axiosInstance.post('/addArticle', blogData);
    toast.success('Blog added successfully!');
    return response.data;
});

// Async thunk to update a blog
export const updateBlog:any  = createAsyncThunk<Blog, Blog>('blogs/updateBlog', async (blogData) => {
    const response = await axiosInstance.patch(`/updateArticle/${blogData.id}`, blogData);
    toast.success('Blog updated successfully!');
    return response.data;
});

// Async thunk to delete a blog
export const deleteBlog:any  = createAsyncThunk<string, string>('blogs/deleteBlog', async (blogId) => {
    await axiosInstance.delete(`/deleteBlogs/${blogId}`);
    toast.success('Blog deleted successfully!');
    return blogId;
});

// Create the blog slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        loading: false,
        error: null,
    } as BlogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(addBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
                state.blogs.push(action.payload);
            })
            .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
                const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
            });
    },
});

export default blogSlice.reducer;
