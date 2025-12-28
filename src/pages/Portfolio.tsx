import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toggleTheme } from '../store/slices/themeSlice';
import { fetchProjects, setFilter } from '../store/slices/projectsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import Navbar from '../components/Navbar';
import Burger from '../components/Burger';
import Toggle from '../components/Toggle';
import ProjectSkeleton from '../components/ProjectSkeleton';

const Portfolio = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const projects = useAppSelector((state) => state.projects.filteredProjects);
    const filter = useAppSelector((state) => state.projects.filter);
    const loading = useAppSelector((state) => state.projects.loading);
    const error = useAppSelector((state) => state.projects.error);
    
    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    useEffect(() => {
        document.title = "Portfolio | Luca Camilleri";
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleFilterChange = (newFilter: string) => {
        dispatch(setFilter(newFilter));
    };

    return (
        <div className="portfolio-page">
            <Navbar theme={isDarkMode ? 'dark' : 'light'} />
            <Burger handleChange={handleToggleTheme} />
            <Toggle handleChange={handleToggleTheme} />
            
            <main className="portfolio-content">
                <header className="portfolio-header">
                    <h1>My Projects</h1>
                    <p>Explore my work in Web Development and Design</p>
                </header>

                {/* Filter buttons */}
                <nav className="filter-nav" role="navigation" aria-label="Project filters">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => handleFilterChange('all')}
                        aria-pressed={filter === 'all'}
                    >
                        All Projects
                    </button>
                    <button
                        className={filter === 'web' ? 'active' : ''}
                        onClick={() => handleFilterChange('web')}
                        aria-pressed={filter === 'web'}
                    >
                        Web Dev.
                    </button>
                    <button
                        className={filter === 'design' ? 'active' : ''}
                        onClick={() => handleFilterChange('design')}
                        aria-pressed={filter === 'design'}
                    >
                        Design
                    </button>
                </nav>

                {loading && (
                    <div role="status" aria-live="polite" aria-label="Loading projects">
                        <ProjectSkeleton />
                    </div>
                )}

                {error && (
                    <div className="error-state" role="alert">
                        <p>Error loading projects: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <article key={project.id} className="project-card">
                                <Link to={`/portfolio/${project.id}`} className="project-link">
                                    <div className="project-image-wrapper">
                                        <img
                                            src={project.image}
                                            alt={`${project.title} preview`}
                                            loading="lazy"
                                        />
                                        {project.featured && (
                                            <span className="featured-tag" aria-label="Featured project">
                                                <i className="fa-solid fa-star"></i> Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="project-info-card">
                                        <h2>{project.title}</h2>
                                        <p>{project.description}</p>
                                        <div className="project-tech">
                                            {project.technologies.slice(0, 3).map((tech, index) => (
                                                <span key={index} className="tech-badge">{tech}</span>
                                            ))}
                                        </div>
                                        <span className="view-details">View Details <i className="fa-solid fa-arrow-right"></i></span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="no-projects">
                        <p>No projects found for this filter.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Portfolio;
