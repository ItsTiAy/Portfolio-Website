interface ExperienceTemplateParams {
    date: string;
    title: string;
    company: string;
    description: string;
}
  
const ExperienceTemplate: React.FC<ExperienceTemplateParams> = ({ date, title, company, description }) => {
    return (
      <div className="container mx-auto mb-4 max-w-3xl">
        <p className="text-xl mt-4">{date}</p>
        <p className="font-bold text-xl">{title}</p>
        <p>{company}</p>
        <p className="mt-4 mx-auto mb-4">{description}</p>
      </div>
    );
};
  
export default ExperienceTemplate;