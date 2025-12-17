import { useNavigate } from 'react-router-dom';

interface HeroProps {
  theme?: string;
  text: string;
  includeButton?: string;
  showAvatar?: boolean;
}

const Hero = ({ text, includeButton, showAvatar }: HeroProps) => {
    const navigate = useNavigate();
    const basePath = import.meta.env.BASE_URL;

    const handlePortfolioClick = () => {
        navigate('/portfolio');
    };

    return (
        <div className="container">
            <div className="containerContent">
                {showAvatar && (
                    <div className="avatar-container">
                        <img src={`${basePath}avatar.jpeg`} alt="Profile" className="avatar" />
                    </div>
                )}
                <h1 className="hero-title">{text}</h1>
                {showAvatar && (
                    <p className="hero-subtitle">Web Developer | Designer | Problem Solver</p>
                )}
                {includeButton && (
                    <div className="buttonDiv">
                        <button onClick={handlePortfolioClick}>
                            <h1>View my Portfolio</h1>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
