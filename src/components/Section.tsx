import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface SectionProps {
  headerText: string;
  headerDescription: string;
  icon?: ReactNode;
  buttonText?: string;
  buttonLink?: string;
}

const Section = ({ headerText, headerDescription, icon, buttonText, buttonLink }: SectionProps) => {
    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        if (buttonLink) {
            navigate(buttonLink);
        }
    };
    
    return (
        <div className='sectionContainer'>
            {icon && <div className='section-icon'>{icon}</div>}
            <h1>{headerText}</h1>
            <p>{headerDescription}</p>
            {buttonText && buttonLink && (
                <button className='section-button' onClick={handleButtonClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default Section;
