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

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
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

export const fetchPatchUser = createAsyncThunk(
  'user/fetchPatchUser',
  async function (payload, { getState, rejectWithValue }) {
    try {
      console.log(payload);
      const response = await api.patch(`user`, {
        username: payload.username,
        avatar: payload.avatar,
      });

      if (response.statusText !== 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTargetUser = createAsyncThunk(
  'user/fetchTargetUser',
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

export const fetchFollowList = createAsyncThunk(
  'user/fetchFollowList',
  async function (searchObject, { getState, rejectWithValue }) {
    try {
      const { key, id } = searchObject;
      const response = await api.get(`/follow/?${key}=${id}`);

      if (response.statusText !== 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFollowUser = createAsyncThunk(
  'user/fetchFollowUser',
  async function (userId, { getState, rejectWithValue }) {
    try {
      const response = await api.post(`/follow/${userId}`);

      if (response.statusText !== 'OK') {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUnfollowUser = createAsyncThunk(
  'user/fetchUnfollowUser',
  async function (id, { getState, rejectWithValue }) {
    try {
      const response = await api.delete(`/follow/${id}`);

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
    targetUser: {},
    currentUser: {},
    posts: [],
    followList: [],
  },
  reducers: {
    userLog(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [fetchIdUser.pending]: (state) => {
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

    [fetchCurrentUser.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.currentUser = action.payload;
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchTargetUser.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchTargetUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;

      state.targetUser = action.payload;
    },
    [fetchTargetUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [fetchPatchUser.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchPatchUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchPatchUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchFollowList.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
      state.followList = action.payload;
    },
    [fetchFollowList.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchFollowUser.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchFollowUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchFollowUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchUnfollowUser.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchUnfollowUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    },
    [fetchUnfollowUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
