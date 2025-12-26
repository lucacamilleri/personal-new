import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProject, fetchProjects } from '../store/slices/projectsSlice';
import type { RootState, AppDispatch } from '../store/store';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { selectedProject, projects, loading } = useSelector((state: RootState) => state.projects);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  // Fetch projects if not already loaded
  useEffect(() => {
    if (projects.length === 0 && !loading) {
      dispatch(fetchProjects());
    }
  }, [projects.length, loading, dispatch]);

  // Set selected project once projects are loaded
  useEffect(() => {
    if (projectId && projects.length > 0) {
      dispatch(setSelectedProject(projectId));
    }
  }, [projectId, projects.length, dispatch]);

  // Redirect if project not found after projects are loaded
  useEffect(() => {
    // Only redirect if projects have been loaded AND project still not found
    if (projects.length > 0 && !loading && !selectedProject && projectId) {
      // Project not found, redirect back
      navigate('/portfolio', { replace: true });
    }
  }, [selectedProject, projects.length, loading, navigate, projectId]);

  // Show loading state while fetching projects or if no project selected yet
  if (loading || (projects.length === 0) || !selectedProject) {
    return (
      <div className="project-detail-loading">
        <div className="spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className={`project-detail ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="project-detail-header">
        <Link to="/portfolio" className="back-link" aria-label="Back to portfolio">
          <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
        </Link>
      </div>

      <article className="project-detail-content">
        <header>
          <h1>{selectedProject.title}</h1>
          {selectedProject.featured && (
            <span className="featured-badge" aria-label="Featured project"><i className="fa-solid fa-star"></i> Featured</span>
          )}
        </header>

        <div className="project-image-container">
          <img
            src={selectedProject.image}
            alt={`Screenshot of ${selectedProject.title}`}
            className="project-image"
            loading="lazy"
          />
        </div>

        <section className="project-info">
          <h2>About This Project</h2>
          <p>{selectedProject.description}</p>

          <h3>Technologies Used</h3>
          <ul className="technologies-list" role="list">
            {selectedProject.technologies.map((tech: string, index: number) => (
              <li key={index} className="technology-tag">
                {tech}
              </li>
            ))}
          </ul>

          <h3>Category</h3>
          <p className="category-badge">{selectedProject.category}</p>

          <div className="project-actions">
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-button"
              aria-label={`View ${selectedProject.title} project (opens in new tab)`}
            >
              View Project <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ProjectDetail;
