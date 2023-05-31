import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    userLog(state) {
      console.log(state.user);
    },
  },
});

export const {userLog} = userSlice.actions;

export default userLog.reducer;