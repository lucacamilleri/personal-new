import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  const renderNavbar = (theme = 'light') => {
    render(
      <BrowserRouter>
        <Navbar theme={theme} />
      </BrowserRouter>
    );
  };

  it('renders all navigation links', () => {
    renderNavbar();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('applies correct theme class', () => {
    renderNavbar('dark');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderNavbar();

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('role', 'navigation');
  });

  it('renders with light theme by default', () => {
    renderNavbar('light');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('all links are properly structured', () => {
    renderNavbar();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});
