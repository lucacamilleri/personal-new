import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../store/slices/themeSlice';
import projectsReducer from '../store/slices/projectsSlice';
import contactReducer from '../store/slices/contactSlice';

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      projects: projectsReducer,
      contact: contactReducer,
    },
    preloadedState,
  });
};
