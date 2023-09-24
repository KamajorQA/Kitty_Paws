import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  displayName: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.displayName = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
