import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  displayName: '',
  uid: '',
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
      state.email = '';
      state.displayName = '';
      state.uid = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
