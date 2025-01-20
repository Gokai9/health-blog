import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ArticleTone, GenerateArticleRequest, GenerateArticleResponse } from '../../types';

interface FormData {
  topic: string;
  keywords: string;
  tone: ArticleTone;
  wordCount: string;
  additionalContext: string;
}

const initialFormData: FormData = {
  topic: '',
  keywords: '',
  tone: 'professional',
  wordCount: '800',
  additionalContext: ''
};

export default function ContentGenerationForm() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');

    try {
      const requestData: GenerateArticleRequest = {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()),
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data: GenerateArticleResponse = await response.json();
      
      // Save the generated article as a draft
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          status: 'draft',
          metadata: data.metadata
        }),
      });

      // Redirect to edit page
      window.location.href = '/admin/articles';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToneChange = (value: ArticleTone) => {
    setFormData(prev => ({
      ...prev,
      tone: value
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Article Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <Input
              required
              name="topic"
              placeholder="e.g., Benefits of Mediterranean Diet"
              value={formData.topic}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Keywords (comma-separated)</label>
            <Input
              required
              name="keywords"
              placeholder="e.g., nutrition, healthy fats, longevity"
              value={formData.keywords}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>
              <Select
                value={formData.tone}
                onValueChange={handleToneChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Word Count</label>
              <Select
                value={formData.wordCount}
                onValueChange={(value: string) => setFormData(prev => ({
                  ...prev,
                  wordCount: value
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 words</SelectItem>
                  <SelectItem value="800">800 words</SelectItem>
                  <SelectItem value="1200">1200 words</SelectItem>
                  <SelectItem value="1500">1500 words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Context</label>
            <Textarea
              name="additionalContext"
              placeholder="Any specific points to cover, target audience, or special requirements..."
              value={formData.additionalContext}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Content...
              </>
            ) : (
              'Generate Article'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}