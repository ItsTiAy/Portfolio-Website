interface ProjectTemplateParams {
    title: string;
    description: string;
    link: string;
}
  
const ProjectTemplate: React.FC<ProjectTemplateParams> = ({ title, description, link }) => {
    return (
        <div className="mb-8 mr-4 snap-center">
            <div className="text-lg font-semibold mb-4 border-b-2">{title}</div>
            <p className="mb-4">{description}</p>
            <a className="hover:underline" href={link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
    );
};
  
export default ProjectTemplate;