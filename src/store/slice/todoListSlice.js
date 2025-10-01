import { createSlice } from '@reduxjs/toolkit';

export const todoListSlice = createSlice({
  name: 'todos',
  initialState: { list: [] },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = todoListSlice.actions;
export default todoListSlice.reducer;
