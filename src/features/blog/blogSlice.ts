// src/store/blogSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from '../user/userSlice';
import { toast } from 'react-toastify';


export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await axios.get(`${SERVER_URL}/getAllArticlesOfLoggedInUser`);
    return response.data;
});

export const addBlog:any = createAsyncThunk('blogs/addBlog', async (blogData) => {
    const response = await axios.post(`${SERVER_URL}/addArticle`, blogData);
    console.log('response :>> ', response);
    if (response.status === 200) {
        toast.success('Blog added successfully!'); // Show success toast
    }
    return response.data;
});

export const updateBlog:any = createAsyncThunk('blogs/updateBlog', async (blogData: any) => {
    const response = await axios.put(`${SERVER_URL}/updateArticle/${blogData.id}`, blogData); 
    if (response.status === 200) {
        toast.success('Blog updated successfully!'); // Show success toast
    }
    return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
    const response = await axios.delete(`${SERVER_URL}/deleteBlogs/${blogId}`);
    if (response.status === 200) {
        toast.success('Blog deleted successfully!'); // Show success toast
    }
    return blogId;
});

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(`Error: ${action.error.message}`); // Show error toast
            })
            .addCase(addBlog.fulfilled, (state: any, action) => {
                state.blogs.push(action.payload);
            })
            .addCase(updateBlog.fulfilled, (state: any, action) => {
                const index = state.blogs.findIndex((blog: any) => blog.id === action.payload.id);
                if (index !== -1) {
                    state.blogs[index] = action.payload; // Update the blog
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter((blog: any) => blog.id !== action.payload);
            });
    },
});

export default blogSlice.reducer;
