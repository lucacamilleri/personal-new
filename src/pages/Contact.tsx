import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import type { RootState } from '../store/store';
import Navbar from '../components/Navbar';
import Burger from '../components/Burger';
import Toggle from '../components/Toggle';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    useEffect(() => {
        document.title = "Contact | Luca Camilleri";
    }, []);

    return (
        <div className="contact-page">
            <Navbar theme={isDarkMode ? 'dark' : 'light'} />
            <Burger handleChange={handleToggleTheme} />
            <Toggle handleChange={handleToggleTheme} />
            
            <main className="contact-main">
                <header className="contact-header">
                    <h1>Get In Touch</h1>
                    <p>Have a question or want to work together? Send me a message!</p>
                </header>
                
                <ContactForm />
            </main>
        </div>
    );
};

export default Contact;
