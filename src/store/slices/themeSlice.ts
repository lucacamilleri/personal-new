import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem('isDarkTheme') || 'false'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkTheme', JSON.stringify(state.isDarkMode));
      document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('isDarkTheme', JSON.stringify(state.isDarkMode));
      document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
