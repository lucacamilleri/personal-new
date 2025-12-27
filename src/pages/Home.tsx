import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import type { RootState } from '../store/store';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Burger from '../components/Burger';
import Toggle from '../components/Toggle';
import Section from '../components/Section';

const Home = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.title = "Home | Luca Camilleri";
  }, []);

  return (
    <div className="home-page">
        <Navbar theme={isDarkMode ? 'dark' : 'light'} />
        <Toggle handleChange={handleToggleTheme} />
        <Burger handleChange={handleToggleTheme} />
        <Hero theme={isDarkMode ? 'dark' : 'light'} text={"LUCA CAMILLERI"} includeButton={"yes"} showAvatar={true} />
        <Section 
            icon={<i className="fa-solid fa-envelope"></i>}
            headerText="Want to work with me?" 
            headerDescription="Get in touch with me through the contact page."
            buttonText="Contact Me"
            buttonLink="/contact"
        />
    </div>
  );
};

export default Home;
