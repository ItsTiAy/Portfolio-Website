import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/linkedin'
import 'react-social-icons/github'

interface FooterParams {
    button: number;
}

const Footer: React.FC<FooterParams> = ({ button }) => {
    const year = new Date().getFullYear();
    return (
        <div className="text-center mt-4">    
            <SocialIcon tabIndex={button == 0 ? 0 : -1} target="_blank" url="https://github.com/ItsTiAy" bgColor="transparent" fgColor="#bae6fd"/>
            <SocialIcon tabIndex={button == 0 ? 0 : -1} target="_blank" url="https://www.linkedin.com/in/thomas-stanway/" bgColor="transparent" fgColor="#bae6fd"/>
            <p className="text-sky-200">© {year} Thomas Stanway. All rights reserved.</p>
        </div>
    );
};
  
export default Footer;