import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userTest: {
      username: 'No+name',
    },
  },
  reducers: {
    userLog(state, action) {
      console.log(action.payload);

      state.userTest = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      console.log(action.payload);

      state.status = 'fulfilled';
      state.error = null;

      state.userTest = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
