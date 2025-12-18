const ProjectSkeleton = () => {
    return (
        <div className="projects-grid">
            {[...Array(6)].map((_, index) => (
                <article key={index} className="project-card skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="project-info-card">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text skeleton-text-short"></div>
                        <div className="skeleton-tech">
                            <span className="skeleton-badge"></span>
                            <span className="skeleton-badge"></span>
                            <span className="skeleton-badge"></span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default ProjectSkeleton;
