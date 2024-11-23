import 'react-social-icons/linkedin'
import 'react-social-icons/github'

import { FiLinkedin, FiGithub } from "react-icons/fi";

interface FooterParams {
    button: number;
}

const Footer: React.FC<FooterParams> = ({ button }) => {
    const year = new Date().getFullYear();
    return (
        <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="flex justify-center space-x-2">
                <a aria-label="Visit My GitHub Page" tabIndex={button == 0 ? 0 : -1} className="" target="_blank" href={"https://github.com/ItsTiAy"}><FiGithub size={24}/></a>
                <a aria-label="Visit My LinkedIn Page" tabIndex={button == 0 ? 0 : -1} target="_blank" href={"https://www.linkedin.com/in/thomas-stanway/"}><FiLinkedin size={24}/></a>
            </div>
            <p className="col-span-2 text-slate-300">© {year} Thomas Stanway. All rights reserved.</p>    
        </div>
    );
};
  
export default Footer;