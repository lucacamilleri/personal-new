import { useState } from 'react';
import { Link } from 'react-router-dom';

interface BurgerProps {
  handleChange?: () => void;
}

const Burger = (_props: BurgerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='burger-container'>
             <button
        type="button"
        className="burger-button"
        onClick={toggleBurgerMenu}
      >
        <i className='theme-icon'>
          {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </i>
      </button>
      {isMenuOpen && (
        <div className="vertical-menu">
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/portfolio">PORTFOLIO</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Burger;
