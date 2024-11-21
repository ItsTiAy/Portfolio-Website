interface ProjectTemplateParams {
    title: string;
    description: string;
    link: string;
    button: number;
}
  
const ProjectTemplate: React.FC<ProjectTemplateParams> = ({ title, description, link, button }) => {
    return (
        <div className="mb-8 mr-4 snap-center">
            <div className="text-lg font-semibold mb-4 border-b-2">{title}</div>
            <p className="mb-4">{description}</p>
            {link && <a tabIndex={button == 3 ? 0 : -1} className="hover:underline" href={link} target="_blank" rel="noopener noreferrer">View Project</a>}
        </div>
    );
};
  
export default ProjectTemplate;