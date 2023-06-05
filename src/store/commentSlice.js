import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

export const fetchGetPostComments = createAsyncThunk(
  'comment/fetchGetPostComments',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.get('comment/', {
        params: { postId: id },
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

export const fetchCommentLike = createAsyncThunk(
  'post/fetchCommentLike',
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.post(`like/${id}?type=comment`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCreateCommentPost = createAsyncThunk(
  'comment/fetchCreateCommentPost',
  async function (payload, { getState, rejectWithValue }) {
    try {
      const response = await api.post(`comment/${payload.id}?type=post`, {
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

export const fetchCreateCommentReply = createAsyncThunk(
  'comment/fetchCreateCommentReply',
  async function (payload, { getState, rejectWithValue }) {
    try {
      const response = await api.post(`comment/${payload.id}?type=comment`, {
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

export const fetchDeleteComment = createAsyncThunk(
  'comment/fetchDeleteComment',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.delete(`comment/${id}`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState: {
    comments: [],
  },
  reducers: {
    commentsLog(state, action) {
      state.comments = action.payload;
    },
  },
  extraReducers: {
    [fetchGetPostComments.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchGetPostComments.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.comments = action.payload;
    },
    [fetchGetPostComments.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchCreateCommentPost.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchCreateCommentPost.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchCreateCommentPost.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchDeleteComment.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchDeleteComment.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchDeleteComment.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchCreateCommentReply.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchCreateCommentReply.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchCreateCommentReply.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchCommentLike.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchCommentLike.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchCommentLike.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
