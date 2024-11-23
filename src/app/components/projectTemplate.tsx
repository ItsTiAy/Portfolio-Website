interface ProjectTemplateParams {
    title: string;
    description: string;
    link?: string;
    source?: string;
    button: number;
}
  
const ProjectTemplate: React.FC<ProjectTemplateParams> = ({ title, description, link, source, button }) => {
    return (
        <div className="mb-8 mr-4 snap-center">
            <div className="text-lg font-semibold mb-4 border-b-2">{title}</div>
            <p className="mb-4">{description}</p>
            <div className="space-x-2">
                {link && <a tabIndex={button == 3 ? 0 : -1} className="p-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg duration-300" href={link} target="_blank" rel="noopener noreferrer">Play Project</a>}
                {source && <a tabIndex={button == 3 ? 0 : -1} className="p-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg duration-300" href={source} target="_blank" rel="noopener noreferrer">View Source Code</a>}
            </div>
        </div>
    );
};
  
export default ProjectTemplate;