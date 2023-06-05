import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.get('post/');

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostLikePost = createAsyncThunk(
  'post/fetchPostLikePost',
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.post(`like/${id}?type=post`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGetLikePost = createAsyncThunk(
  'post/fetchGetLikePost',
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.get(`like/${id}?type=post`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.get('post/', {
        params: { authorId: id },
      });

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  'post/fetchCreatePosts',
  async function (payload, { getState, rejectWithValue }) {
    try {
      const response = await api.post('post/', {
        url: payload.imgUrl,
        content: payload.content,
      });

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'post/fetchDeletePost',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.delete(`post/${id}`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    posts: [],
    postLikes: [],
  },
  reducers: {
    postsLog(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchUserPosts.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchUserPosts.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.posts = action.payload;
    },
    [fetchUserPosts.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchCreatePost.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchCreatePost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchCreatePost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchDeletePost.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchDeletePost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchDeletePost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchPostLikePost.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchPostLikePost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchPostLikePost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchGetLikePost.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchGetLikePost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.postLikes = action.payload;
    },
    [fetchGetLikePost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
