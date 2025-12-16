import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

interface ToggleProps {
  handleChange: (theme: string) => void;
}

const Toggle = ({ handleChange }: ToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkScheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    handleChange(newTheme);
  };

  return (
    <div className='toggle-container'>
      <button
        type="button"
        className="toggle-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <i className="fas fa-moon fa-2x theme-icon"></i>
        ) : (
          <i className="fas fa-sun fa-2x theme-icon"></i>
        )}
      </button>
    </div>
  );
};

Toggle.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Toggle;
