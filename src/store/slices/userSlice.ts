import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  displayName: null,
  uid: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
    },
    removeUser(state) {
      state.email = null;
      state.displayName = null;
      state.uid = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
