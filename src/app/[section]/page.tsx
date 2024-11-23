import SectionContent from '../components/sectionContent';

export async function generateStaticParams() {
  return [
    { section: 'home' },
    { section: 'about' },
    { section: 'projects' },
    { section: 'experience' },
  ];
}

export default function SectionsPage() {
  return (
    <div>
      <SectionContent />
    </div>
  );
}
