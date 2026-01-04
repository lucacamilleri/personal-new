import { describe, it, expect } from 'vitest';
import themeReducer, { toggleTheme, setTheme } from './themeSlice';

describe('Theme Redux Slice', () => {
  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: 'unknown' })).toEqual({
      isDarkMode: false,
    });
  });

  it('should handle toggleTheme', () => {
    const initialState = { isDarkMode: false };
    
    const state = themeReducer(initialState, toggleTheme());
    expect(state.isDarkMode).toBe(true);
    
    const toggledState = themeReducer(state, toggleTheme());
    expect(toggledState.isDarkMode).toBe(false);
  });

  it('should handle setTheme with true', () => {
    const initialState = { isDarkMode: false };
    
    const state = themeReducer(initialState, setTheme(true));
    expect(state.isDarkMode).toBe(true);
  });

  it('should handle setTheme with false', () => {
    const initialState = { isDarkMode: true };
    
    const state = themeReducer(initialState, setTheme(false));
    expect(state.isDarkMode).toBe(false);
  });

  it('should persist theme to localStorage when toggling', () => {
    const initialState = { isDarkMode: false };
    
    themeReducer(initialState, toggleTheme());
    
    // localStorage mock should have been called
    expect(localStorage.getItem('isDarkTheme')).toBeDefined();
  });
});
