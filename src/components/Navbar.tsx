import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  theme: string;
}

const Navbar = ({ theme }: NavbarProps) => {
  const location = useLocation();
  const basePath = import.meta.env.BASE_URL;
  const logoImage = theme === 'dark' ? `${basePath}lightLogo.png` : `${basePath}darkLogo.png`;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <Link to="/" aria-label="Home">
          <img 
            src={logoImage} 
            alt="Luca Camilleri logo" 
            width="120" 
            height="40"
          />
        </Link>
        <ul role="list">
          <li>
            <Link 
              to="/" 
              aria-current={isActive('/') ? 'page' : undefined}
              className={isActive('/') ? 'active' : ''}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              to="/about"
              aria-current={isActive('/about') ? 'page' : undefined}
              className={isActive('/about') ? 'active' : ''}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link 
              to="/portfolio" 
              aria-current={isActive('/portfolio') || location.pathname.startsWith('/portfolio/') ? 'page' : undefined}
              className={isActive('/portfolio') || location.pathname.startsWith('/portfolio/') ? 'active' : ''}
            >
              PORTFOLIO
            </Link>
          </li>
          <li>
            <Link 
              to="/contact"
              aria-current={isActive('/contact') ? 'page' : undefined}
              className={isActive('/contact') ? 'active' : ''}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
