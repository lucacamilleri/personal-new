interface ProjectProps {
  title: string;
  description: string;
  backgroundImage: string;
  link: string;
}

const Project = ({ title, description, backgroundImage, link }: ProjectProps) => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
    };

    return (
        <a href={link} className="projectContainer">
            <div className="backgroundImage" style={backgroundStyle}></div>
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
};

export default Project;
