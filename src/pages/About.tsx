import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import type { RootState } from '../store/store';
import Navbar from '../components/Navbar';
import Burger from '../components/Burger';
import Toggle from '../components/Toggle';

const About = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    useEffect(() => {
        document.title = "About | Luca Camilleri";
    }, []);

    const skills = [
        { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Redux'] },
        { category: 'Design', items: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping'] },
        { category: 'Other', items: ['Git', 'IoT', 'Problem Solving', 'Team Collaboration'] }
    ];

    return (
        <div className="about-page">
            <Navbar theme={isDarkMode ? 'dark' : 'light'} />
            <Burger handleChange={handleToggleTheme} />
            <Toggle handleChange={handleToggleTheme} />
            
            <main className="about-main">
                <article className="about-content">
                    <header className="about-header">
                        <h1>About Me</h1>
                        <p className="intro">
                            I'm a 20-year-old web developer from Malta, passionate about creating 
                            beautiful and functional web experiences.
                        </p>
                    </header>

                    <section className="about-section">
                        <h2>Background</h2>
                        <p>
                            Currently pursuing my journey in web development, I specialise in creating 
                            modern, responsive websites and applications. My goal is to become a 
                            full-stack developer, combining both frontend and backend technologies 
                            to build complete solutions.
                        </p>
                        <p>
                            I enjoy working on diverse projects, from simple static websites to 
                            complex web applications with state management and interactive features. 
                            Each project is an opportunity to learn and grow my skills.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>Skills & Technologies</h2>
                        <div className="skills-container">
                            {skills.map((skillGroup, index) => (
                                <div key={index} className="skill-group">
                                    <h3>{skillGroup.category}</h3>
                                    <ul role="list">
                                        {skillGroup.items.map((skill, idx) => (
                                            <li key={idx}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="about-section">
                        <h2>Experience</h2>
                        <div className="experience-item">
                            <h3>Junior Software Engineer @ GasanMamo Insurance</h3>
                            <p className="experience-period">Current</p>
                            <p>
                                Working on various full stack development projects using <b>INTERSYSTEMS
                                ObjectScript</b>.
                            </p>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
};

export default About;
