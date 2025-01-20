import ContentGenerationForm from './ContentGenerationForm';

export default function GeneratePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Generate Content</h1>
      <ContentGenerationForm />
    </div>
  );
}