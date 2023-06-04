import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

export const fetchIdUser = createAsyncThunk(
  'user/fetchIdUser',
  async function (updateData, { rejectWithValue }) {
    try {
      const response = await api.get('auth');

      if (response.statusText !== 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.get(`user/${id}`);

      if (response.statusText !== 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userId: null,
    user: {},
    posts: [],
  },
  reducers: {
    userLog(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [fetchIdUser.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchIdUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.id = action.payload.id;
    },
    [fetchIdUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchUser.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
